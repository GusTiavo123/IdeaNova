import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    CredentialsProvider({
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          await connectToDb();
          if (!credentials || !credentials.username || !credentials.password)
            throw new Error("Credentials not provided");

          const user = await User.findOne({ username: credentials.username });
          if (!user) throw new Error("User not found");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) throw new Error("Incorrect password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }; // Ensure this object includes all required user properties
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "github") {
        console.log(user);
        try {
          connectToDb();
          const userSearch = await User.findOne({ email: user?.email });
          if (!userSearch) {
            const newUser = new User({
              username: user?.name,
              email: user?.email,
              image: user?.image,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
} satisfies NextAuthOptions;

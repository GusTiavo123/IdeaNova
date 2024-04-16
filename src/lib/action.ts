"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

interface AddPostResult {
  error?: string;
}

export const addPost = async (form: FormData) => {
  const session = await getServerSession(authOptions);
  const { title, content, imageURL } = Object.fromEntries(form);
  const email = session?.user?.email as string;
  try {
    await connectToDb();

    const slug = await getLastPostSlug();
    const newSlug = incrementSlug(slug);
    const id = await getUserIdByEmail(email);

    const newPost = new Post({
      title,
      desc: content,
      slug: newSlug,
      userId: id,
      img: imageURL,
    });

    await newPost.save();
    console.log("Save to db");
    revalidatePath("/blog");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (form: FormData): Promise<AddPostResult> => {
  const { slug } = Object.fromEntries(form);

  try {
    await connectToDb();

    await Post.findOneAndDelete({slug});
    console.log("Post deleted");
    revalidatePath("/blog");

    return {};
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export const registerWithEmail = async (form: FormData) => {
  const { username, email, password, rePassword, image } = Object.fromEntries(
    form
  ) as {
    username: string;
    email: string;
    password: string;
    rePassword: string;
    image: string;
  };

  if (password !== rePassword) {
    return { error: "Passwords do not match" };
  }
  try {
    connectToDb();

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      if (user.username === username) {
        return { error: "Username already exists" };
      } else if (user.email === email) {
        return { error: "Email already in use" };
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    await newUser.save();
    return { succes: "User has been created!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const user = await User.findOne({ email: email }).select("_id");
    if (user) {
      return user._id.toString();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

async function getLastPostSlug() {
  try {
    const lastPost = await Post.findOne()
      .sort({ createdAt: -1 })
      .select("slug");
    console.log(lastPost);
    if (lastPost) {
      return lastPost.slug;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching the last post:", error);
    return null;
  }
}

function incrementSlug(slug: string): string {
  // Primero verificamos que slug sea un string válido
  if (typeof slug !== "string" || slug.trim() === "") {
    throw new Error("Invalid slug provided. It must be a non-empty string.");
  }

  const regex = /(\d+)$/;
  const match = slug.match(regex);

  if (match && match[0]) {
    const num = parseInt(match[0], 10);
    const incrementedNum = num + 1;
    const newSlug = slug.replace(regex, incrementedNum.toString());
    return newSlug;
  } else {
    // Aquí añadimos "-1" si no hay números al final
    return `${slug}-1`;
  }
}

export const goHome = () => {
  redirect("/");
};

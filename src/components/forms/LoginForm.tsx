"use client";

import styles from "./loginForm.module.css";
import { signIn } from "next-auth/react";
import GithubIcon from "@/components/icons/GithubIcon";
import UserIcon from "@/components/icons/UserIcon";
import Link from "next/link";
import toast from "react-hot-toast";
import { goHome } from "@/lib/action";

const LoginForm = () => {

  const handleUsername = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: `${window.location.origin}`,
    });

    if (res?.error) {
      toast.error(res.error);
    }
    if (res?.ok && res.url) {
      goHome();
    }
  };

  const handleGithub = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn("github", {
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Login</h2>
        <form onSubmit={handleUsername} className={styles.form}>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit" className={styles.button}>
            <UserIcon /> Login with Username
          </button>
        </form>
        <div className={styles.line}></div>
        {/* <form onSubmit={handleGithub} className={styles.form}>
          <button type="submit" className={styles.button}>
            <GithubIcon /> Login with Github
          </button>
        </form> */}
        <p>
          {"Don't have an account? "}
          <Link href="/register" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

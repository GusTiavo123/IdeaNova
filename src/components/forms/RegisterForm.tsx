"use client";

import { registerWithEmail } from "@/lib/action";
import styles from "./register.module.css";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = await registerWithEmail(formData);

    if (message.error) {
      toast.error(message.error, { style: { backgroundColor: "white" } });
    }
    if (message.succes) {
      toast.success(message.succes, {
        style: { backgroundColor: "white" },
      });
      form.reset();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="username" />
          <input name="email" type="email" placeholder="name@example.com" />
          <input name="password" type="password" placeholder="password" />
          <input
            name="rePassword"
            type="password"
            placeholder="password again"
          />
          {/* {ver como agregar fotos a la hora de registrar} */}
          <button type="submit">Submit</button>
        </form>
        <p>
          Have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { deletePost } from "@/lib/action";
import styles from "./delete-post.module.css";
import { useRouter } from "next/navigation";

export default function DeletePostForm() {
    const router = useRouter()

  const handleDeletePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    await deletePost(formData)

    router.push("/blog")
    
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleDeletePost} className={styles.form}>
        <h2>Delete Post</h2>
        <input
          className={styles.input}
          type="text"
          id="slug"
          name="slug"
          required
          placeholder="slug"
        />
        <button type="submit" className={styles.button}>
          Delete
        </button>
      </form>
    </div>
  );
}
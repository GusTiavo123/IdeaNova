"use client";

import { addPost } from "@/lib/action";
import styles from "./add-post.module.css";
import { useRouter } from "next/navigation";

export default function AddPostForm() {
    const router = useRouter()

  const handleAddPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    await addPost(formData)

    router.push("/blog")
    
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAddPost} className={styles.form}>
        <h2>Add New Post</h2>
        <input
          className={styles.input}
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title"
        />
        <textarea
          className={styles.textarea}
          id="content"
          name="content"
          required
          placeholder="Content"
        />
        <input
          className={styles.input}
          type="text"
          id="imageURL"
          name="imageURL"
          placeholder="Image URL from images.pexels.com (optional)"
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

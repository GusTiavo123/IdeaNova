"use client";

import Image from "next/image";
import styles from "./contact.module.css";
import toast from "react-hot-toast";

const ContactPage = () => {
  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    toast.success("Message has been sent");

    form.reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleContact}>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Name and Surname"
          />
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            required
          />
          <input type="tel" placeholder="Phone Number (optional)" />
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="Message"
          ></textarea>
          <button className={styles.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

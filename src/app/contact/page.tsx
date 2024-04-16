import Image from "next/image";
import styles from "./contact.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IdeaNova contact page",
  description: "IdeaNova contact form",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number (optional)" />
          <textarea name="" id="" cols={30} rows={10} placeholder="Message"></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
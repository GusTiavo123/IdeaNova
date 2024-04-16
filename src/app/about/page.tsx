import Image from "next/image";
import styles from "./about.module.css"
import Box from "@/components/box/Box";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IdeaNova about page",
  description: "IdeaNova about info",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better
        </h1>
        <p className={styles.desc}>
          We create digital ideas that are bigger, bolder, braver and better. We
          believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance solution provider. Wide range
          of web and software development services.
        </p>
        <div className={styles.boxes}>
          <Box title="10k+" text="Year of experience" />
          <Box title="10k+" text="Year of experience" />
          <Box title="10k+" text="Year of experience" />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
import styles from "./singlePost.module.css"
import Image from "next/image";

const SinglePostPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/post.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detailContainer}>
          <Image src="/noavatar.png" alt="" width={50} height={50} className={styles.avatar} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Gus Aramayo</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, explicabo. Fugiat voluptatibus iure sapiente sit, ipsa beatae at quis earum eveniet, provident modi enim consectetur ea exercitationem. Animi, suscipit nihil!
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
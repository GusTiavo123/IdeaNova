import UserBox from "@/components/userBox/UserBox";
import styles from "./singlePost.module.css"
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "../../../lib/data";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.desc
  };
}

const SinglePostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  if (!post) {
    return <div className={styles.container}>Post not found</div>
  }

  return (
    <div className={styles.container}>
      {post.img && <div className={styles.imgContainer}>
        <Image src={post.img} alt="" fill className={styles.img} />
      </div>}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detailContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <UserBox id={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};


export default SinglePostPage;
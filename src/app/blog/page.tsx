import { Metadata } from "next";
import { getPosts } from "../../lib/data";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

// Fetch data with an API
// async function getData() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

export const metadata: Metadata = {
  title: "IdeaNova blog page",
  description: "IdeaNova posts info",
};

const BlogPage = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getPosts();

  if (!session) {
    return redirect("/login");
  } else {
    return (
      <>
        <div className={styles.buttonContainer}>
          <Link href="/blog/add-post" className={styles.postButton}>
            Add Post
          </Link>
          <Link href="/blog/delete-post" className={styles.postButton}>
            Delete Post
          </Link>
        </div>
        <div className={styles.container}>
          {posts.map((post: Post) => (
            <div className={styles.post} key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default BlogPage;

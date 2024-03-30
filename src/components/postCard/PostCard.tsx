import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="/post.png" alt="" fill className={styles.img}/>
        </div>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab velit corporis, inventore laudantium consequatur deleniti consequuntur ullam quibusdam voluptas blanditiis, qui fuga aspernatur ad id beatae? Sed, iure quae? Odio.</p>
        <Link className={styles.link} href="/blog/1">READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard
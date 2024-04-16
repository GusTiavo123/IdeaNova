import { getUser } from "../../lib/data";
import styles from "./userBox.module.css"
import Image from "next/image";

type UserBoxProps = {
    id: String;
}

const UserBox = async ({ id }: UserBoxProps) => {
    const user = await getUser(id);
    if (!user) {
        return (
            <div className={styles.container}>User not found</div>
        );
    }
    return (
        <div className={styles.container}>
            <Image src={user.img ? user.img : "/noavatar.png"} alt="" width={50} height={50} className={styles.avatar} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    );
};


export default UserBox;
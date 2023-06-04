import styles from "@/styles/review.module.css";
import {AiOutlineUser } from "react-icons/ai";

export default function Review({user, review}) {
    return <div className={styles.main}>
        <div className={styles.user}>
            <AiOutlineUser/>
            <div>
                {user.name}
            </div>
        </div>
        <hr/>
        <div className={styles.review}>
            <div className={styles.title}>
                {review.title}
            </div>
            <div className={styles.description}>
                {review.description}
            </div>
        </div>
    </div>
}
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import {AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser} from "react-icons/ai";
import Image from "next/image";

export default function Header() {
    return <div className={styles.main}>
        <Link  href={"/"} className={styles.logo}>
            <Image
                src={"/logo.png"}
                height={40}
                width={150}
                alt={"HRV-Mart"}
            />
        </Link>
        <div className={styles.searchBar} title="Search Product">
        <Typewriter options={{
                strings: [
                    "Search Product",
                    "Search Bags",
                    "Search Speakera",
                    "Search T-Shirt",
                ],
                autoStart: true,
                loop: true,

            }}/>
        </div>
        <div className={styles.info}>
            <Link href={"/login"}>
                <AiOutlineUser className={styles.icon} title={"Login"}/>
            </Link>
            <Link href={"/like"}>
                <AiOutlineHeart className={styles.icon} title={"Like"}/>
            </Link>
            <Link href={"/cart"}>
                <AiOutlineShoppingCart className={styles.icon} title={"Cart"}/>
            </Link>
        </div>
    </div>
}
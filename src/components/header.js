import styles from "../styles/Header.module.css";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import {AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser} from "react-icons/ai";

export default function Header() {
    return <div className={styles.main}>
        <Link  href={"/"} className={styles.icon}>
           HRV-Mart
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
                <AiOutlineUser color={"white"} title={"Login"}/>
            </Link>
            <Link href={"/like"}>
                <AiOutlineHeart color={"white"} title={"Like"}/>
            </Link>
            <Link href={"/cart"}>
                <AiOutlineShoppingCart color={"white"} title={"Cart"}/>
            </Link>
        </div>
    </div>
}
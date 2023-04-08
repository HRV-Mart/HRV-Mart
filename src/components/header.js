import styles from "../styles/Header.module.css";
import Link from "next/link";
import Typewriter from 'typewriter-effect';

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
                    "Search Speeker",
                    "Search T-Shirt",
                ],
                autoStart: true,
                loop: true,

            }}/>
        </div>
        <div className={styles.info}>
            <Link href={"/login"}>
                Login
            </Link>
            <Link href={"/cart"}>
                Cart
            </Link>
        </div>
    </div>
}
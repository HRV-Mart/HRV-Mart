import styles from "../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
    return <div className={styles.main}>
        <Link  href={"/"} className={styles.icon}>
           HRV-Mart
        </Link>
        <input className={styles.searchBar} placeholder="Search Products" title={"Search Products"}/>
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
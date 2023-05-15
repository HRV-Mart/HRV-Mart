import styles from "../styles/Header.module.css";
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import {AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineShop} from "react-icons/ai";
import Image from "next/image";

export default function Header({token}) {
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
                    "Search Speaker",
                    "Search T-Shirt"
                ],
                autoStart: true,
                loop: true,

            }}/>
        </div>
        <div className={styles.info}>
            {
                token ? <>
                        <Link href={"/like"} className={styles.icon_container}>
                            <AiOutlineHeart title={"Like"}/>
                            <div className={styles.iconTitle}>Like</div>
                        </Link>
                        <Link href={"/cart"} className={styles.icon_container}>
                            <AiOutlineShoppingCart title={"Cart"}/>
                            <div className={styles.iconTitle}>Cart</div>
                        </Link>
                        <Link href={"/order"} className={styles.icon_container}>
                            <AiOutlineShop title={"Orders"}/>
                            <div className={styles.iconTitle}>Orders</div>
                        </Link>
                    </>:
                    <>
                        <Link href={"/login"} className={styles.icon_container}>
                            <AiOutlineUser  title={"Login"}/>
                            <div className={styles.iconTitle}>Login</div>
                        </Link>
                        <Link href={"/signup"} className={styles.icon_container}>
                            <AiOutlineUsergroupAdd  title={"Sign Up"}/>
                            <div className={styles.iconTitle}>Sign Up</div>
                        </Link>
                    </>
            }

        </div>
    </div>
}
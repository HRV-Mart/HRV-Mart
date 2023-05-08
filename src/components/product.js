import styles from "@/styles/ProductOverview.module.css"
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
export default function Product ({id, title, images}) {
    const [presentImage, setPresentImage] = useState(images[0]);

    return <div
        onMouseEnter={()=>{
            if (images.length > 1) {
                setPresentImage(images[1]);
            }
        }}
        onMouseLeave={()=>{
            setPresentImage(images[0]);
        }}
        className={styles.main}>
            <Link href={`/product/${id}`}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <Image
                    className={styles.image}
                    src={presentImage}
                    alt={title}
                    width={200}
                    height={200}
                />
            </Link>
        </div>
}
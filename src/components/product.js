import styles from "@/styles/ProductOverview.module.css"
import Link from "next/link";
import Image from "next/image";
export default function Product ({id, title, images}) {
    return <div className={styles.main}>
            <Link href={`/product/${id}`}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <Image
                    className={styles.image}
                    src={images[0]}
                    alt={title}
                    width={200}
                    height={200}
                />
            </Link>
        </div>
}
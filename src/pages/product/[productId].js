import {getRequest} from "@/service/network/network";
import styles from "@/styles/Product.module.css";
import Image from "next/image";
import {useState} from "react";

export default function ProductPage ({product}) {
    const [imageIndex, setImageIndex] = useState(0);
    return <div className={styles.main}>
        <div className={styles.imageSection}>
            <Image
                src={product.images[imageIndex]}
                alt={product.name}
                width={500}
                height={500}
            />
            <div className={styles.imageIndicatorContainer}>
                <button
                    onClick={()=>decrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ◄
                </button>
                <div className={styles.textIndicator}>
                    {imageIndex+1}/{product.images.length}
                </div>
                <button
                    onClick={()=>incrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ►
                </button>
            </div>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.details}>
            <div className={styles.title}>
                {product.name}
            </div>
            <div className={styles.description}>
                {product.description}
            </div>
        </div>
    </div>

    function incrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex >= totalImageSize-1) {
            setImageIndex(0)
        }
        else {
            setImageIndex(imageIndex+1)
        }
    }
    function decrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex <= 0) {
            setImageIndex(totalImageSize-1)
        }
        else {
            setImageIndex(imageIndex-1)
        }
    }
}
export async function getServerSideProps(content) {
    const product = await getRequest(
        `${process.env.APPLICATION_URL}/api/product/${content.query.productId}`,
        {},
        true
    );
    if (product.status === 200) {
        return {
            props: {
                product: product.data
            }
        }
    }
    else {
        return {
            props: {
                product: {}
            }
        }
    }
}
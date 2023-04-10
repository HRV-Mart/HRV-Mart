import {getRequest} from "@/service/network/network";
import styles from "@/styles/Product.module.css";
import Image from "next/image";
import {useState} from "react";
import Typewriter from 'typewriter-effect';
import {AiFillHeart} from "react-icons/ai";
import { toast } from "react-toastify";

export default function ProductPage ({product}) {
    const [imageIndex, setImageIndex] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [isLike, setIsLike] = useState(false);

    function incrementCartItem() {
        if (totalItem < 10) {
            setTotalItem(totalItem+1);
        }
    }
    function decreaseCartItem() {
        if (totalItem >= 1) {
            setTotalItem(totalItem-1);
        }
    }
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
        <hr className={styles.vertical_divider}/>
        <div className={styles.details}>
            <div className={styles.title}>
                <Typewriter options={{
                    autoStart: true,
                    strings: product.name,
                }} />
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTitle}>
                    Description:
                </div>
                <div className={styles.description}>
                    {product.description}
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTitle}>
                    Price:
                </div>
                <div className={styles.description}>
                    ₹ {product.price}
                </div>
            </div>
            <div className={styles.likeCartContainer}>
                <div className={styles.likeContainer} onClick={changeLike}>
                    {
                        isLike ?
                            <AiFillHeart
                                fill={"red"}/> :
                            <AiFillHeart  />
                    }
                </div>
                <div className={styles.cartContainer}>
                    {cartHolder()}
                </div>
            </div>
            <hr className={styles.horizontal_divider}/>
        </div>
    </div>
    function changeLike() {
        if (! isLike) {
            toast('Product added to Like', { hideProgressBar: false, autoClose: 2000, type: 'success', theme: "light"});
        }
        else {
            toast('Product remove from Like', { hideProgressBar: false, autoClose: 2000, type: 'error', theme: "light"});
        }
        setIsLike(!isLike)
    }
    function cartHolder() {
        if (totalItem === 0) {
            return <div
                className={styles.cartHolder}
                onClick={()=>{incrementCartItem()}}
            >
                ADD TO CART
            </div>
        }
        else {
            return <div className={styles.cartHolder}>
                <div onClick={()=>{decreaseCartItem()}} className={`${styles.cartButton} ${styles.red_background}`}>
                    -
                </div>
                <div className={styles.quantity}>
                    {totalItem}
                </div>
                <div onClick={()=>{incrementCartItem()}} className={`${styles.cartButton} ${styles.green_background}`}>
                    +
                </div>
            </div>
        }
    }

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
import Review from "@/components/review";
import { logError, logMessage } from "@/service/logging/logging";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/service/network/network";
import styles from "@/styles/Product.module.css";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";

export default function ProductPage({ product, token }) {
    const [imageIndex, setImageIndex] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(loadQuantity, [token, product.id])

    useEffect(() => {
        isProductLiked();
    }, [0])
    function incrementCartItem(isNew) {
        updateProductQuantity(totalItem + 1, isNew)
        setTotalItem(totalItem + 1);
    }
    function decreaseCartItem() {
        if (totalItem >= 1) {
            updateProductQuantity(totalItem - 1, false)
            setTotalItem(totalItem - 1);
        }
    }
    function loadQuantity() {
        loadReviews()
        getRequest(`/api/cart/${product.id}`, token, true)
            .then((data) => {
                if (data.status === 200) {
                    setTotalItem(data.data)
                }
            })
            .catch((error) => { logError(error); setTotalItem(0) })
    }
    function updateProductQuantity(updatedQuantity, isNew) {
        if (isNew) {
            postRequest(
                `/api/cart`,
                {
                    productId: product.id,
                    quantity: updatedQuantity
                },
                { authentication: `bearer:${token}`, "Content-Type": "application/json" },
                false
            )
                .then(logMessage)
                .catch(logError)
        }
        else if (updatedQuantity > 0) {
            putRequest(
                `/api/cart`,
                {
                    productId: product.id,
                    quantity: updatedQuantity
                },
                { authentication: `bearer:${token}`, "Content-Type": "application/json" },
                false
            )
                .then(logMessage)
                .catch(logError)
        }
        else {
            deleteRequest(
                `/api/cart/${product.id}`,
                {},
                { authentication: `bearer:${token}` },
                false
            )
                .then(logMessage)
                .catch(logError)
        }
    }
    return <div className={styles.main}>
        <div className={styles.imageSection}>
            <img
                className={styles.image}
                src={product.images[imageIndex]}
                alt={product.name}
            />
            <div className={styles.imageIndicatorContainer}>
                <button
                    onClick={() => decrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ◄
                </button>
                <div className={styles.textIndicator}>
                    {imageIndex + 1}/{product.images.length}
                </div>
                <button
                    onClick={() => incrementImageIndex()}
                    className={styles.imageIndicator}
                >
                    ►
                </button>
            </div>
        </div>
        <hr className={styles.vertical_divider} />
        <div className={styles.rightContainer}>
            <div className={styles.upperContainer}>
                <div className={styles.details}>
                    <div className={styles.title}>
                        {product.name}
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
                    {
                        token ? <div className={styles.likeCartContainer}>
                            <div className={styles.likeContainer} onClick={changeLike}>
                                {
                                    isLike ?
                                        <AiFillHeart
                                            fill={"red"} /> :
                                        <AiFillHeart />
                                }
                            </div>
                            <div className={styles.cartContainer}>
                                {cartHolder()}
                            </div>
                        </div> :
                            <></>
                    }
                    <hr className={styles.horizontal_divider} />
                </div>
            </div>
            <div className={styles.lowerContainer}>
                <div className={styles.reviews}>
                    {
                        reviews.map((review, index) => {
                            return <Review review={review.review} user={review.user} key={index} />
                        })
                    }
                </div>
            </div>
            {
                token ? <div className={styles.floatingButton}>
                    Add Review
                </div> : <></>
            }
        </div>
    </div>
    function loadReviews() {
        const productId = product.id;
        getRequest(
            `/api/review?productId=${productId}`,
            token,
            true
        )
            .then((result) => { setReviews(result.data.data); logMessage(result.data.data) })
            .catch(logError)
    }
    function changeLike() {
        if (!isLike) {
            postRequest(`/api/like`, {
                productId: product.id
            }, { authentication: `bearer:${token}`, "Content-Type": "application/json" }, false).then(() => {
                toast('Product added to Like', { hideProgressBar: false, autoClose: 2000, type: 'success', theme: "light" });
            }).catch((error) => {
                toast('Error while processing your request', { hideProgressBar: false, autoClose: 2000, type: 'error', theme: "light" });
            });
        }
        else {
            deleteRequest(
                `/api/like/${product.id}`,
                {},
                { authentication: `bearer:${token}` },
                false
            ).then((result) => {
                logMessage(result)
                toast('Product remove from Like', { hideProgressBar: false, autoClose: 2000, type: 'info', theme: "light" });
            }).catch((error) => {
                toast('Error while processing your request', { hideProgressBar: false, autoClose: 2000, type: 'error', theme: "light" });
            });
        }
        setIsLike(!isLike)
    }
    function cartHolder() {
        if (totalItem === 0 || totalItem == 0) {
            return <div
                className={styles.cartHolder}
                onClick={() => { incrementCartItem(true) }}
            >
                ADD TO CART
            </div>
        }
        else {
            return <div className={styles.cartHolder}>
                <div onClick={() => { decreaseCartItem() }} className={`${styles.cartButton} ${styles.red_background}`}>
                    -
                </div>
                <div className={styles.quantity}>
                    {totalItem}
                </div>
                <div onClick={() => { incrementCartItem(false) }} className={`${styles.cartButton} ${styles.green_background}`}>
                    +
                </div>
            </div>
        }
    }

    function incrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex >= totalImageSize - 1) {
            setImageIndex(0)
        }
        else {
            setImageIndex(imageIndex + 1)
        }
    }
    function decrementImageIndex() {
        const totalImageSize = product.images.length;
        if (imageIndex <= 0) {
            setImageIndex(totalImageSize - 1)
        }
        else {
            setImageIndex(imageIndex - 1)
        }
    }
    function isProductLiked() {
        getRequest(`/api/like/${product.id}`, token, false)
            .then((data) => {
                logMessage(data.data);
                if (data.status === 200) {
                    if (data.data === "true" || data.data === true) {
                        setIsLike(true)
                    }
                    else {
                        setIsLike(false)
                    }
                }
            })
            .catch((error) => {
                logError(error);
            })
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
import {useEffect, useState} from "react";
import styles from "@/styles/CartProduct.module.css";
import {deleteRequest, getRequest, putRequest} from "@/service/network/network";
import {logError, logMessage} from "@/service/logging/logging";
import Image from "next/image";

export default function CartProduct({productId, quantity, token, setRefresh}) {
    const [product, setProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(quantity);

    useEffect(()=> {
        getRequest(`/api/product/${productId}`, "", true)
            .then((result)=> {
                setProduct(result.data);
            })
            .catch((error)=> {
                logMessage(error);
            })
    }, [productId]);

    function incrementQuantity() {
        updateProductQuantity(productQuantity+1)
        setProductQuantity(productQuantity+1);
    }
    function decrementQuantity() {
        if (productQuantity > 0) {
            updateProductQuantity(productQuantity-1)
            setProductQuantity(productQuantity-1);
        }
    }
    function updateProductQuantity(updatedQuantity) {
        if (updatedQuantity > 0) {
            putRequest(
                `api/cart`,
                {
                    productId: productId,
                    quantity: updatedQuantity
                },
                {authentication: `bearer:${token}`, "Content-Type": "application/json"},
                false
            )
                .then(logMessage)
                .catch(logError)
        }
        else {
            deleteRequest(
                `/api/cart/${productId}`,
                {},
                {authentication: `bearer:${token}`},
                false
            )
                .then(logMessage)
                .catch(logError)
        }
        setRefresh(true);
    }
    if (product === null) {
        return <div></div>
    }
    else {
        return <div className={styles.main}>
            <Image src={product.images[0]} alt="Product Image" width={50} height={50}/>
            <div className={styles.title}>
                {product.name}
            </div>
            <div className={styles.quality_container}>
                <button
                    className={`${styles.button} ${styles.red}`}
                    onClick={decrementQuantity}
                >-</button>
                {productQuantity}
                <button
                    className={`${styles.button} ${styles.green}`}
                    onClick={incrementQuantity}
                >+</button>
            </div>
        </div>
    }
}
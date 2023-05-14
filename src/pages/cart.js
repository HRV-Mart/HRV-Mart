import {logError, logMessage} from "@/service/logging/logging";
import { getRequest } from "@/service/network/network";
import styles from "@/styles/Like.module.css"
import { useEffect, useState } from "react";
import CartProduct from "@/components/cart_product";

export default function Cart ({token, index}) {

    const [productIds, setProductIds] = useState([]);
    const [price, setPrice] = useState(0);
    const [refresh, setRefresh] = useState(true);

    if (refresh) {
        getData();
        setRefresh(false);
    }
    logMessage(productIds);
    function getCost() {
        getRequest('/api/cart/computeCost', token, true)
            .then((result) => {
                setPrice(result.data);
            })
            .catch((error)=>{
                logError(error)
            })
    }
    function getData() {
        getRequest('/api/cart', token, true)
            .then((result) => {
                setProductIds(result.data);
            })
            .catch((error)=>{
                logError(error)
            })
    }
    if (refresh) {
        getCost();
    }
    useEffect(getData, [token]);
    return <div className={styles.main}>
        {
            productIds.map((raw_product, index)=>{
                if (raw_product.quantity > 0) {
                    return <CartProduct
                        token={token}
                        key={index}
                        productId={raw_product.productId}
                        quantity={raw_product.quantity}
                        setRefresh={setRefresh}
                    />
                }
            })
        }
        <div>
            Total Cost: {price}
        </div>
    </div>
}
export async function getServerSideProps(context) {
    const index = context?.query.index;
    if (index) {
        return { props: { index: index } };
    }
    else {
        return { props: { index: 0 } };
    }
}
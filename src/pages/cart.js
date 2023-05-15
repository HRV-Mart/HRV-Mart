import {logError, logMessage} from "@/service/logging/logging";
import { getRequest } from "@/service/network/network";
import styles from "@/styles/Cart.module.css"
import { useEffect, useState } from "react";
import CartProduct from "@/components/cart_product";
import {toast} from "react-toastify";

export default function Cart ({token}) {

    const [productIds, setProductIds] = useState([]);
    const [price, setPrice] = useState(0);
    const [refresh, setRefresh] = useState(true);

    if (refresh) {
        getData();
        setRefresh(false);
    }
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
        {price === 0 ?
            <div>Cart is empty</div> :
            <div className={styles.cartHolder}>
                <div>
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
                    <div className={styles.cost}>
                        Total Cost: {price}
                    </div>
                </div>
                <button
                    className={styles.orderButton}
                    onClick={()=>{
                        getRequest(`/api/cart/purchase`, token, false)
                            .then((data) =>{
                                    logMessage(data);
                                    toast(
                                        'Order placed successfully 🥳',
                                        {
                                            hideProgressBar: false,
                                            autoClose: 2000,
                                            type: 'success',
                                            theme: 'colored'
                                        }
                                    );
                                    setRefresh(true);
                                }
                            )
                            .catch((error)=>{logError(error); setRefresh(true)})
                    }}
                >
                    Place Order
                </button>
            </div>
        }
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
import {useEffect, useState} from "react";
import {getRequest} from "@/service/network/network";
import {logError} from "@/service/logging/logging";
import styles from "@/styles/Order.module.css";

export default function Index({token}) {
    const [orders, setOrders] = useState([]);
    function getOrders () {
        getRequest("/api/order", token, true)
            .then((result)=>{setOrders(result.data)})
            .catch(logError)
    }
    useEffect(getOrders, [token]);

    return <div className={styles.main}>
        <div className={styles.order}>
            <div className={styles.orderNumber}>
                Order Index
            </div>
            <div className={styles.date}>
                Date Of Order
            </div>
            <div className={styles.price}>
                Total Price
            </div>
            <div className={styles.status}>
                Order Status
            </div>
        </div>
        <hr className={styles.divider}/>
        {
            orders.map((order, index)=>{
                return <div key={index} className={`${styles.order} ${styles.orderShadow}`}>
                    <div className={styles.orderNumber}>
                        {index+1}
                    </div>
                    <div className={styles.date}>
                        {order.dateTimeOfOrder.split("T0")[0]}
                    </div>
                    <div className={styles.price}>
                        {order.price}
                    </div>
                    <div className={styles.status}>
                        {order.status}
                    </div>
                </div>
            })
        }
    </div>
}
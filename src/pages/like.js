import styles from "@/styles/Like.module.css";
import {getRequest} from "@/service/network/network";
import {useEffect, useState} from "react";
import Router from "next/router";
import {logError, logMessage} from "@/service/logging/logging";

export default function Like ({token, index}) {
    if (! token) {
        try {
            Router.push("/404")
                .then(()=>{})
                .catch((error)=>{logError(error)});
        }
        catch (e) {
            logError(e);
        }
    }
    const [products, setProducts] = useState([]);
    async function loadData(page_index) {
        const response = await getRequest(
            `/api/like?page=${page_index}`,
            token,
            true
        );
        if (response.status === 200) {
            setProducts(response.data.data);
        }
        else {
            setProducts([]);
        }
    }
    useEffect(() => {
        loadData(index)
    }, [])
    return <div className={styles.main}>
        <div >
            {
                products.map(function (product, index) {
                    return <div>
                        {product.productId}
                    </div>
                })
            }
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
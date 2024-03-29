import Product from "@/components/product";
import { logError, logMessage } from "@/service/logging/logging";
import { getRequest } from "@/service/network/network";
import styles from "@/styles/Like.module.css"
import { useEffect, useState } from "react";

export default function Like ({token, index}) {

    const [products, setProducts] = useState([]);
    function getData() {
        getRequest(`/api/like?page=${index}`, token, true)
            .then((result) => {
                setProducts(result.data.data);
                logMessage(products);
            })
            .catch(logError)
    }

    useEffect(()=>{getData()}, [0]);
    return <div className={styles.products}>
        {
            products.map((product, index)=> {
                return <Product
                    key={product.id}
                    title={product.name}
                    id={product.id}
                    images={product.images}
                />
            })
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
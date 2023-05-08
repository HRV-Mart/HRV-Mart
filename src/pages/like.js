import styles from "@/styles/Like.module.css";
import Product from "@/components/product";
import {getRequest} from "@/service/network/network";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Like ({token}) {
    const router = useRouter();
    const index = router.query;
    const [products, setProducts] = useState([]);
    async function loadData(page_index) {
        const response = await getRequest(`/api/product?page=${page_index}`, {}, true);
        console.log(response)
        if (response.status === 200) {
            setProducts(response.data.data);
        }
        else {
            setProducts([]);
        }
    }
    useEffect(() => {
        loadData(0)
    }, [0])
    return <div className={styles.main}>
        <div className={styles.products}>
            {
                products.map(function (product, index) {
                    return <Product
                        key={product.id}
                        title={product.name}
                        id={product.id}
                        images={product.images}
                    />
                })
            }
        </div>
    </div>
}
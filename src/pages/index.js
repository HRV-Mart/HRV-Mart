import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {getQueryFromURL, getRequest} from "@/service/network/network";
import Product from "@/components/product";
import { logError, logMessage } from '@/service/logging/logging';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
    const [products, setProducts] = useState([])
    const [nextPage, setNextPage] = useState(0)
    useEffect(loadProduct, []);

  return (
    <>
      <Head>
        <title>HRV-Mart</title>
        <meta name="description" content="An e-commerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
          {
            nextPage && nextPage !== "null" ? <div onClick={loadProduct}>
                Load More Products
            </div> : <></>
          }
      </main>
    </>
  )
  function loadProduct () {
    getRequest(`/api/product?page=${nextPage}`, {}, true)
    .then((response) => {
        var res = NaN
    if (response.status === 200) {
        res = {
            products: response.data.data,
            nextPage: response.data.nextPage
        }
    }
    else {
        res = {
            products: [],
            nextPage: "null"
        }
    }
    for (let index = 0; index < res.products.length; index++) {
        products.push(res.products[index])
        
    }
    setNextPage(res.nextPage)
    setProducts(products)
    })
    .catch(logError)
  }
}
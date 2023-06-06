import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {getQueryFromURL, getRequest} from "@/service/network/network";
import Product from "@/components/product";
import { logError, logMessage } from '@/service/logging/logging';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home({products, nextPage, size}) {
    // const [products, setProducts] = useState([])
    // const [nextPage, setNextPage] = useState(0)

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
          <div className={styles.bottom}>
          {
            nextPage && nextPage !== "null" ? <Link className={styles.load} href={`/?page=${nextPage}&size=${size}`}>
                Next Page
            </Link> : <></>
          }
          </div>
      </main>
    </>
  )
}
export async function getServerSideProps(content) {
  logMessage(`${content.resolvedUrl}`)
  const query = getQueryFromURL(content.resolvedUrl, `/`);
  const response = await getRequest(`${process.env.APPLICATION_URL}/api/product${query}`, {}, true);
  
  var res = NaN
  if (response.status === 200) {
      res = {
          products: response.data.data,
          nextPage: response.data.nextPage,
          size: response.data.size
      }
  }
  else {
      res = {
          products: [],
          nextPage: "null",
          size: 1
      }
  }
  return {
    props: res
  };
}
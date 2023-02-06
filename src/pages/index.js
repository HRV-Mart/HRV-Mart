import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {getRequest} from "@/service/network/network";
import {logMessage} from "@/service/logging/logging";
import Product from "@/components/product";

export default function Home({products}) {
    logMessage(products);
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
      </main>
    </>
  )
}
export async function getServerSideProps({ req, res }) {
    const response = await getRequest(`http://localhost:3000/api/product`, {}, true);
    if (response.status === 200) {
        return {
            props: {
                products: response.data.data
            }
        }
    }
    else {
        return {
            props: {
                products: {}
            }
        };
    }
}
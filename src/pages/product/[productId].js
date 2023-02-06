import {getRequest} from "@/service/network/network";
import styles from "@/styles/Product.module.css";
import 'react-slideshow-image/dist/styles.css'
import {Fade, Slide, Zoom} from "react-slideshow-image";
import {logMessage} from "@/service/logging/logging";
import Image from "next/image";

export default function ProductPage ({product}) {
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px',
        width: '400px'
    }
    return <div className={styles.main}>
        <div className={styles.title}>
            {product.name}
        </div>
        <div>
            <Fade
                pauseOnHover={true}
                autplay={true}
                duration={1000}
                transitionDuration={1000}
                arrows={false}
            >
                {
                    product.images.map(function (image, index) {
                        return < div key={index} style={{ ...divStyle, 'backgroundImage': `url(${image})` }}/>
                    })
                }
            </Fade>
        </div>
        <div className={styles.description}>
            {product.description}
        </div>
    </div>
}
export async function getServerSideProps(content) {
    const product = await getRequest(
        `${process.env.APPLICATION_URL}/api/product/${content.query.productId}`,
        {},
        true
    );
    if (product.status === 200) {
        return {
            props: {
                product: product.data
            }
        }
    }
    else {
        return {
            props: {
                product: {}
            }
        }
    }
}
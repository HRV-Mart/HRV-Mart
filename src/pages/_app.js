import '@/styles/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {
  return <>
    <Header/>
    <Component {...pageProps} />
    <ToastContainer/>
    <Footer/>
  </>

}

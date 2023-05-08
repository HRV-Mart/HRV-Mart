import '@/styles/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {useState} from "react";


export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  return <>
    <Header token={token}/>
    <Component {...pageProps} token={token} setToken={setToken}/>
    <ToastContainer/>
    <Footer/>
  </>
}

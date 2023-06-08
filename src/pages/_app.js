import '@/styles/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {useState} from "react";
import { logMessage } from '@/service/logging/logging';
import { Account, Client } from 'appwrite';

export default function App({ Component, pageProps }) {
  const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const appwrite_project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const application_url = process.env.NEXT_PUBLIC_APPLICATION_URL;

  var account = null

  if (appwrite_endpoint && appwrite_project && application_url) {
    const client = new Client()
    .setEndpoint(appwrite_endpoint)
    .setProject(appwrite_project);
  
    account = new Account(client)
    const promise = account.createJWT();
  
    promise.then(function (response) {
      setToken(response.jwt)
    }, function (error) {
      setToken(null)
    });
  }
  else {
    account = null;
  }


  const [token, setToken] = useState(null);
  setTimeout(()=>{
    setToken(null)
  }, 1000*60*10);
  return <>
    <Header token={token}/>
    <Component {...pageProps} token={token} account={account} application_url={application_url}/>
    <ToastContainer/>
    <Footer/>
  </>
}

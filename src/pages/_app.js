import '@/styles/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import { Account, Client } from 'appwrite';
import { postRequest } from '@/service/network/network';

export default function App({ Component, pageProps }) {
  const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const appwrite_project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const application_url = process.env.NEXT_PUBLIC_APPLICATION_URL;
  const [account, setAccount] = useState(appwrite_token());

  const [token, setToken] = useState(null);
  setTimeout(() => {
    setAccount(appwrite_token())
  }, 1000 * 6);

  return <>
    <Header token={token} />
    <Component {...pageProps} token={token} account={account} application_url={application_url} />
    <ToastContainer />
    <Footer />
  </>

  function appwrite_token() {
    var account = null

    if (appwrite_endpoint && appwrite_project && application_url) {
      const client = new Client()
        .setEndpoint(appwrite_endpoint)
        .setProject(appwrite_project);

      account = new Account(client)
      const promise = account.createJWT();

      promise.then(function (response) {
        postRequest(
          '/api/login',
          {
            jwt: response.jwt,
          },
          {
            "Content-Type": "application/json"
          },
          true
        )
        .then((result)=>{
          if (result.status === 200) {
            setToken(result.data.token)
          }
          else {
            setToken(null)
          }
        })
      }, function (error) {
        setToken(null)
      });
    }
    else {
      account = null;
    }
    return account;
  }
}

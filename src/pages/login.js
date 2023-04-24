import styles from '@/styles/Login.module.css'
import {postRequest} from "@/service/network/network";
import {useState} from "react";
import {logError} from "@/service/logging/logging";
import Router from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [messageCode, setMessageCode] = useState(0);

    return <div className={styles.main}>
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}/>
            <hr/>
            <div className={styles.login}>
                <div className={styles.title}>
                    Login
                </div>
                <div className={`${styles.space} ${styles.title}`}>
                    <Typewriter options={{
                        strings: [
                            "Welcome back to our website",
                            "Please login with your existing account"
                        ],
                        autoStart: true,
                        loop: true
                    }}/>
                </div>
                <div className={styles.loginForm}>
                    <input
                        className={styles.inputHolder}
                        title={"Email"}
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                    <input
                        className={styles.inputHolder}
                        title={"Password"}
                        type={"password"}
                        placeholder={"Password"}
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                    <button className={styles.button} onClick={()=> {login()}}>
                        Submit
                    </button>
                    <div className={styles.signupMessage}>
                        Do not have an account? {" "}
                        <Link href={'/signup'} className={styles.signup}>
                            Sign up
                        </Link>
                    </div>
                    {generateMessage()}
                </div>
            </div>
        </div>
    </div>

    function generateMessage() {
        if (isLoading === true) {
            return <div className={styles.messageLoading}>
                Loading ...
            </div>
        }
        else if (messageCode === 0) {
            return <div/>
        }
        else if (messageCode === 200) {
            return <div className={styles.messageSuccess}>
                Login Success fully
            </div>
        }
        else if (messageCode === 404) {
            return <div className={styles.messageError}>
                Incorrect credentials
            </div>
        }
        else {
            return <div className={styles.messageError}>
                Something went wrong
            </div>
        }
    }
    function login() {
        setLoading(true);
        postRequest(
            '/api/login',
            {
                email: email,
                password: password
            },
            {
                "Content-Type": "application/json"
            },
            true
        )
            .then((data)=> {
                setLoading(false);
                setMessageCode(data.status);

                if (data.status === 200) {
                    toast('Login Successfully', { hideProgressBar: false, autoClose: 2000, type: 'success', theme: 'colored'});
                    Router.push('/')
                    // Save jwt token

                }
            })
            .catch((error) => {
                logError(error)
                setMessageCode(500);
                setLoading(false);
            })
    }
}
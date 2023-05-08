import styles from '@/styles/Signup.module.css'
import {useState} from "react";
import Link from "next/link";
import {postRequest} from "@/service/network/network";
import Router from "next/router";
import {logError} from "@/service/logging/logging";
import { toast } from 'react-toastify';
import Typewriter from "typewriter-effect";
export default function Signup({setToken}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [messageCode, setMessageCode] = useState(0);

    return <div className={styles.main}>
        <div className={styles.signupContainer}>
            <div className={styles.imageContainer}/>
            <hr/>
            <div className={styles.signup}>
                <div className={styles.title}>
                    Sign Up
                </div>
                <div className={styles.space}>
                    <div className={`${styles.space} ${styles.title}`}>
                        <Typewriter options={{
                            strings: [
                                "Welcome to our website",
                                "Please create an account"
                            ],
                            autoStart: true,
                            loop: true
                        }}/>
                    </div>
                </div>
                <div className={styles.signupForm}>
                    <input
                        className={styles.inputHolder}
                        title={"Name"}
                        type={"text"}
                        placeholder={"Name"}
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
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
                    <button className={styles.button} onClick={()=>{signup()}} >
                        Submit
                    </button>
                    <div className={styles.loginMessage}>
                        Do not have an account? {" "}
                        <Link href={'/login'} className={styles.login}>
                            Login
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
    function signup() {
        setLoading(true);
        postRequest(
            '/api/signup',
            {
                name: name,
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
                    const token = data.data.token;
                    if (token) {
                        setToken(token);
                    }
                    toast("Account created successfully", { hideProgressBar: false, autoClose: 2000, type: 'success', theme: 'colored'});
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
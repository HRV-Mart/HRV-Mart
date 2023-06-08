import styles from '@/styles/Login.module.css'
import { toast } from 'react-toastify';
import Typewriter from "typewriter-effect";

export default function Login({ account, application_url, message}) {
    if (message === "LOGIN_ERROR") {
        toast(
            'Unable to Login',
            {
                hideProgressBar: false,
                autoClose: 2000,
                type: "error",
                theme: "dark"
            }
        );
    }
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
                            "Welcome back to HRV-Mart",
                            "Please login with your account"
                        ],
                        autoStart: true,
                        loop: true
                    }}/>
                </div>
                <div className={styles.loginForm}>
                    <div onClick={()=>oauth_2_handler('github')} className={styles.loginButton}>
                    <div className={styles.brand_icon_container}>
                            <img src={'/github_icon.svg'} className={styles.brand_icon}/>
                        </div>
                        <div className={styles.loginTitle}>
                            Login with GitHub
                        </div>
                    </div>
                    <div onClick={()=>oauth_2_handler('discord')} className={styles.loginButton}>
                    <div className={styles.brand_icon_container}>
                            <img src={'/discord_icon.svg'} className={styles.brand_icon}/>
                        </div>
                        <div className={styles.loginTitle}>
                            Login with Discord
                        </div>
                    </div>
                    <div onClick={()=>oauth_2_handler('google')} className={styles.loginButton}>
                        <div className={styles.brand_icon_container}>
                            <img src={'/google_icon.svg'} className={styles.brand_icon}/>
                        </div>
                        <div className={styles.loginTitle}>
                            Login with Google
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    function oauth_2_handler(provider) {
        account.createOAuth2Session(
            provider,
            application_url,
            `${application_url}/login?message=LOGIN_ERROR`
        )
    }
}
export async function getServerSideProps(content) {
    const message = content.query.message || null;
    return {
        props: {
            message: message
        }
    }
}
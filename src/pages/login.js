import styles from '@/styles/Login.module.css'
export default function Login() {
    return <div className={styles.main}>
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}/>
            <hr/>
            <div className={styles.login}>
                <div className={styles.title}>
                    Login
                </div>
                <div className={styles.space}/>
                <form title={"Login"} className={styles.loginForm}>
                    <input className={styles.inputHolder} title={"Email"} type={"email"} placeholder={"Email"}/>
                    <input className={styles.inputHolder} title={"Password"} type={"password"} placeholder={"Password"}/>
                    <button className={styles.button} >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
}
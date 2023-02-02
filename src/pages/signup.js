import styles from '@/styles/Signup.module.css'
export default function Signup() {
    return <div className={styles.main}>
        <div className={styles.signupContainer}>
            <div className={styles.imageContainer}/>
            <hr/>
            <div className={styles.signup}>
                <div className={styles.title}>
                    Sign Up
                </div>
                <div className={styles.space}/>
                <form title={"Signup"} className={styles.signupForm}>
                    <input className={styles.inputHolder} title={"Name"} type={"text"} placeholder={"Name"}/>
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
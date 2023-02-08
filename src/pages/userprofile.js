import styles from "@/styles/userProfile.module.css";
import {useState} from "react";

export default function UserProfile({user}) {
    const [name, setName] = useState(`${user.name}`);

    return <div className={styles.main}>
        <div className={styles.imageContainer}>
            <div className={styles.image}/>
        </div>
        <hr/>
        <div className={styles.userProfile}>
            <div className={styles.title}>
                Hi {user.name} 👋
            </div>
            <div className={styles.form}>
                <div className={styles.field}>
                    <div>
                        Update your Name
                    </div>
                    <input
                        className={styles.input}
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                        title="Update Your Name"
                        placeholder={"Update Your Name"}
                    />
                </div>
                <div className={styles.field}>
                    <div>
                        Email Address
                    </div>
                    <input
                        className={styles.input}
                        title="Email Address"
                        value={user.email}
                        disabled={true}
                    />
                </div>
                <button className={styles.submit}>
                    Update Profile
                </button>
            </div>
        </div>
    </div>
}
export async function getServerSideProps({req, res}) {
    return {
        props: {
            user: {
                name: "Test User",
                email: "test@test.com",
            }
        }
    }
}
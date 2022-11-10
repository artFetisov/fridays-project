import {FC} from "react";
import styles from './RegisterPage.module.scss';
import React from "react";
import {RegisterForm} from "../../screens/RegisterForm/RegisterForm";
import {Link} from "react-router-dom";


export const RegisterPage: FC = () => {

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Sign Up</h3>
            <RegisterForm/>
            <span className={styles.question}>Already have an account?</span>
            <Link to={'/login'}>
                <span className={styles.signIn}>Sign in</span>
            </Link>

        </div>
    </div>
}
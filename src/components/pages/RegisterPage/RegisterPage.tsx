import React, {FC} from "react";
import styles from './RegisterPage.module.scss';
import {RegisterForm} from "../../screens/RegisterForm/RegisterForm";
import {Link} from "react-router-dom";
import {fontTheme} from "../../../assets/materialUiThemes";
import {ThemeProvider} from "@mui/material/styles";
import {PATH} from "../../../routes/router.data";


export const RegisterPage: FC = () => {

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Sign Up</h3>
            <ThemeProvider theme={fontTheme}>
                <RegisterForm/>
            </ThemeProvider>
            <span className={styles.question}>Already have an account?</span>
            <Link to={PATH.LOGIN}>
                <span className={styles.signIn}>Sign in</span>
            </Link>
        </div>
    </div>
}
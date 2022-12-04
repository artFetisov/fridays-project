import React, {FC} from "react";
import styles from './RegisterPage.module.scss';
import {RegisterForm} from "../../screens/RegisterForm/RegisterForm";
import {Link} from "react-router-dom";
import {fontTheme} from "../../../assets/materialUiThemes";
import {ThemeProvider} from "@mui/material/styles";
import {PATH} from "../../../routes/router.data";
import cn from 'classnames';
import {useAppSelector} from "../../../hooks/useAppSelector";


export const RegisterPage: FC = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Sign Up</h3>
            <ThemeProvider theme={fontTheme}>
                <RegisterForm/>
            </ThemeProvider>
            <span className={styles.question}>Already have an account?</span>
            <div className={cn(styles.signIn, {
                [styles.isDisabled]: isLoading
            })}>
                <Link to={PATH.LOGIN}>
                    <span>Sign in</span>
                </Link>
            </div>
        </div>
    </div>
}
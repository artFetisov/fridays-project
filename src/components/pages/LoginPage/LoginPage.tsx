import React, {FC} from "react";
import {Link} from "react-router-dom";
import styles from './LoginPage.module.scss';
import {LoginForm} from "../../screens/LoginForm/LoginForm";
import {ThemeProvider} from "@mui/material/styles";
import {fontTheme} from "../../../assets/materialUiThemes";
import {PATH} from "../../../routes/router.data";
import {useAppSelector} from "../../../hooks/useAppSelector";
import cn from 'classnames';

export const LoginPage: FC = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Sign in</h3>
            <ThemeProvider theme={fontTheme}>
                <LoginForm/>
            </ThemeProvider>
            <div className={styles.question}><span>Don`t have an account?</span></div>
            <div className={cn(styles.signUp, {
                [styles.isDisabled]: isLoading
            })}>
                <Link to={PATH.REGISTRATION}><span>Sign Up</span></Link>
            </div>

        </div>
    </div>
}
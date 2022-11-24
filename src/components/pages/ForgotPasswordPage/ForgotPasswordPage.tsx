import React, {FC} from "react";
import styles from './ForgotPasswordPage.module.scss';
import {validEmail} from "../../../utils/regex";
import {TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {ThemeProvider} from "@mui/material/styles";
import {fontTheme} from "../../../assets/materialUiThemes";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {Button} from "../../ui/button/Button";
import {Link, useNavigate} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import {forgotPassTC} from "../../../store/reducers/auth/auth.actions";

export const ForgotPasswordPage: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<{ email: string }>()

    const redirect = () => {
        navigate(PATH.CHECK)
    }

    const onSubmit: SubmitHandler<{ email: string }> = ({email}) => {
        dispatch(forgotPassTC({email, redirect}))
        reset()
    }

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Forgot your password?</h3>
            <ThemeProvider theme={fontTheme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    < TextField
                        id="email"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message || ''}
                        variant="standard"
                        fullWidth
                        className={styles.input}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: validEmail && validEmail,
                                message: 'Please enter a valid email',
                            },
                        })}/>
                    <div className={styles.text}>
                        <span>Enter your email address and we will send you further instructions</span>
                    </div>
                    <Button big>Send Instructions</Button>
                    <div className={styles.question}>
                        <span>Have you remembered your password?</span>
                    </div>
                    <Link to={PATH.LOGIN}>
                            <span className={styles.try}>
                                 Try logging in
                            </span>
                    </Link>
                </form>
            </ThemeProvider>
        </div>
    </div>
}
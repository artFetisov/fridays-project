import React, {FC, useState} from "react";
import styles from './NewPasswordPage.module.scss';
import {Button} from "../../ui/button/Button";
import {CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {ThemeProvider} from "@mui/material/styles";
import {fontTheme} from "../../../assets/materialUiThemes";
import {useNavigate, useParams} from "react-router-dom";
import {setNewPassTC} from "../../../store/reducers/auth/auth.actions";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {PATH} from "../../../routes/router.data";

export const NewPasswordPage: FC = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const {token} = useParams()

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const redirect = () => {
        navigate(PATH.LOGIN)
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<{ password: string }>()


    const onSubmit: SubmitHandler<{ password: string }> = (data) => {
        const newData: { password: string, resetPasswordToken: string } =
            {
                password: data.password,
                resetPasswordToken: token ? token : '',
            }
        dispatch(setNewPassTC({...newData, redirect}))
    }

    const handleChange = (prop: keyof { password: string }) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }


    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Create new password</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={fontTheme}>
                    <TextField
                        {...register(
                            'password', {
                                required: 'Password is required!',
                                minLength: {
                                    value: 8,
                                    message: 'Min length should more 8 symbols!',
                                }
                            })}
                        disabled={isLoading}
                        id="password"
                        error={!!errors.password}
                        helperText={errors.password?.message || ''}
                        className={styles.input}
                        fullWidth
                        variant={'standard'}
                        label={'Password'}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </ThemeProvider>
                <div className={styles.text}>Create new password and we will send you further instructions to email
                </div>
                <Button big disabled={isLoading}>{isLoading ?
                    <CircularProgress style={{color: 'white'}} size={16}/> :
                    <span>Create new password</span>}</Button>
            </form>
        </div>
    </div>
}
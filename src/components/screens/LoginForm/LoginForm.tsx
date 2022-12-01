 import React, {FC, useEffect, useState} from "react";
import {Checkbox, FormControlLabel, IconButton, InputAdornment, TextField} from "@mui/material";
import styles from './LoginForm.module.scss';
import {validEmail} from "../../../utils/regex";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {SubmitHandler, useForm} from "react-hook-form";
import {ILoginData} from "../../../types/auth";
import {Button} from "../../ui/button/Button";
import {loginTC} from "../../../store/reducers/auth/auth.actions";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {PATH} from "../../../routes/router.data";

interface ILoginFormState {
    password: string;
    showPassword: boolean
}

export const LoginForm: FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuth) {
            return navigate(PATH.PROFILE)
        }
    }, [isAuth])


    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<ILoginData>()


    const onSubmit: SubmitHandler<ILoginData> = (data) => {
        dispatch(loginTC(data))
        reset()
    }

    const handleChange = (prop: keyof ILoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
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


    return <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
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

        <TextField
            {...register(
                'password', {
                    required: 'Password is required!',
                    minLength: {
                        value: 7,
                        message: 'Min length should more 7 symbols!',
                    }
                })}
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

        <FormControlLabel className={styles.input} control={<Checkbox/>}
                          label="Remember me"  {...register('rememberMe')}
                          style={{marginTop: '10px'}} id={'rememberMe'}/>

        <div className={styles.forgotText}><span>
            <Link to={PATH.FORGOT}>
                  Forgot Password?
            </Link>

        </span></div>

        <Button big>Sign In</Button>
    </form>
}
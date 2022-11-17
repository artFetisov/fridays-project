import React, {FC, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import styles from './RegisterForm.module.scss';
import {Button} from "../../ui/button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {IRegisterData} from "../../../types/auth";
import {validEmail} from "../../../utils/regex";
import {registerTC} from "../../../store/reducers/auth/auth.actions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../routes/router.data";

interface IRegisterFormState {
    password: string;
    showPassword: boolean
    confirmPassword: string
    showConfirmPassword: string
}

export const RegisterForm: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
    });

    const redirect = () => {
        navigate(PATH.LOGIN)
    }

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
        watch
    } = useForm<IRegisterData>()

    const onSubmit: SubmitHandler<IRegisterData> = (data) => {
        const {email, password} = data
        dispatch(registerTC({email, password, redirect}))
        reset()
    }

    const handleChange = (prop: keyof IRegisterFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword
        })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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


        <TextField
            {...register(
                'confirmPassword', {
                    required: 'Confirm password is required!',
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "Your passwords do no match";
                        }
                    },
                    minLength: {
                        value: 7,
                        message: 'Min length should more 7 symbols!',
                    },
                })}
            id="confirm-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || ''}
            fullWidth
            variant={'standard'}
            label={'Confirm Password'}
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className={styles.input}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />

        <Button big>Sign Up</Button>
    </form>
}
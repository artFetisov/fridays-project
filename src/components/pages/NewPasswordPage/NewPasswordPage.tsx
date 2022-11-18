import React, {FC, useState} from "react";
import styles from './NewPasswordPage.module.scss';
import {Button} from "../../ui/button/Button";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {ThemeProvider} from "@mui/material/styles";
import {fontTheme} from "../../../assets/materialUiThemes";

export const NewPasswordPage: FC = () => {
    const dispatch = useAppDispatch()

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<{ password: string }>()


    const onSubmit: SubmitHandler<{ password: string }> = (data) => {
        console.log(data)
        reset()
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
            <ThemeProvider theme={fontTheme}>
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
            </ThemeProvider>
            <div className={styles.text}>Create new password and we will send you further instructions to email</div>
            <Button big>Create new password</Button>

        </div>
    </div>
}
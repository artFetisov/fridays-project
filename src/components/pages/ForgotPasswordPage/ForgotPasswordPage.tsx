import React, { FC } from 'react'

import { CircularProgress, TextField } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import cn from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { fontTheme } from '../../../assets/materialUiThemes'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { PATH } from '../../../routes/router.data'
import { forgotPassTC } from '../../../store/reducers/auth/auth.actions'
import { validEmail } from '../../../utils/regex'
import { Button } from '../../ui/button/Button'

import styles from './ForgotPasswordPage.module.scss'

export const ForgotPasswordPage: FC = () => {
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = appStatus === 'loading'

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>()

  const redirect = () => {
    navigate(PATH.CHECK)
  }

  const onSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
    dispatch(forgotPassTC({ email, redirect }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h3 className={styles.title}>Forgot your password?</h3>
        <ThemeProvider theme={fontTheme}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              disabled={isLoading}
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
              })}
            />
            <div className={styles.text}>
              <span>Enter your email address and we will send you further instructions</span>
            </div>
            <Button disabled={isLoading} big>
              {isLoading ? (
                <CircularProgress style={{ color: 'white' }} size={16} />
              ) : (
                <span>Send Instructions</span>
              )}
            </Button>
            <div className={styles.question}>
              <span>Have you remembered your password?</span>
            </div>
            <div
              className={cn(styles.toLoginPage, {
                [styles.isDisabled]: isLoading,
              })}
            >
              <Link to={PATH.LOGIN}>
                <span>Try logging in</span>
              </Link>
            </div>
          </form>
        </ThemeProvider>
      </div>
    </div>
  )
}

import { createAsyncThunk } from '@reduxjs/toolkit'

import { authService } from '../../../services/auth.service'
import { ILoginData } from '../../../types/auth'
import { errorToastr, successToastr } from '../../../utils/toastr'
import { setAppStatus } from '../app/app.slice'
import { setUserData } from '../user/user.slice'

import { setIsAuth } from './auth.slice'

export const registerTC = createAsyncThunk<
  void,
  { email: string; password: string; redirect: () => void }
>('auth/register', async ({ email, password, redirect }, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    await authService.registration(email, password)
    successToastr('Registration', 'Complited successfully', dispatch, setAppStatus('succeeded'))
    redirect()
  } catch (error) {
    errorToastr(error as Error, 'Registration error', dispatch, setAppStatus('failed'))
  }
})

export const loginTC = createAsyncThunk<void, ILoginData>(
  'auth/login',
  async (data, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await authService.login(data)
      await dispatch(authMeTC({}))
      successToastr('Login', 'Complited successfully', dispatch, setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Login error', dispatch, setAppStatus('failed'))
    }
  }
)

export const authMeTC = createAsyncThunk<void, { redirect?: () => void }>(
  'auth/me',
  async ({ redirect }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.authMe()

      dispatch(setUserData(response))
      dispatch(setIsAuth(true))
    } catch (error) {
      dispatch(setIsAuth(false))
      redirect && redirect()

      return rejectWithValue(error)
    }
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    await authService.logout()
    dispatch(setUserData(null))
    dispatch(setIsAuth(false))
    successToastr('Log out', 'Complited successfully', dispatch, setAppStatus('succeeded'))
  } catch (error) {
    errorToastr(error as Error, 'Log out error', dispatch, setAppStatus('failed'))
  }
})

export const forgotPassTC = createAsyncThunk<void, { email: string; redirect: () => void }>(
  'auth/forgotPass',
  async ({ email, redirect }, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await authService.forgotPass(email)
      successToastr('Instructions sent', 'Check your email', dispatch, setAppStatus('succeeded'))
      redirect()
    } catch (error) {
      errorToastr(error as Error, 'Forgot password error', dispatch, setAppStatus('failed'))
    }
  }
)

export const setNewPassTC = createAsyncThunk<
  void,
  { password: string; resetPasswordToken: string; redirect: () => void }
>('auth/set-pass', async (data, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    await authService.setNewPass(data)
    successToastr('Password updated', 'Follow the login page', dispatch, setAppStatus('succeeded'))
    data.redirect()
  } catch (error) {
    errorToastr(error as Error, 'New password setting error', dispatch, setAppStatus('failed'))
  }
})

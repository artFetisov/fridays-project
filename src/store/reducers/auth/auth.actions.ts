import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../../../services/auth.service";
import {ILoginData} from "../../../types/auth";
import {setUserData} from "../user/user.slice";
import {setAppStatus} from "../app/app.slice";
import {setIsAuth} from "./auth.slice";
import {errorToastr, successToastr} from "../../../utils/toastr";

export const registerTC = createAsyncThunk<void, { email: string, password: string, redirect: () => void }>('auth/register',
    async ({email, password, redirect}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus('loading'))
            await authService.registration(email, password)
            successToastr('Registration', 'Complited successfully', dispatch)
            redirect()
        } catch (error) {
            errorToastr(error as Error, 'Registration error', dispatch)
        }
    }
)

export const loginTC = createAsyncThunk<void, ILoginData>('auth/login',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus('loading'))
            await authService.login(data)
            await dispatch(authMeTC())
            successToastr('Login', 'Complited successfully', dispatch)
        } catch (error) {
            errorToastr(error as Error, 'Login error', dispatch)
        }
    }
)

export const authMeTC = createAsyncThunk('auth/me', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await authService.authMe()
        dispatch(setUserData(response))
        dispatch(setIsAuth(true))
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus('loading'))
        await authService.logout()
        dispatch(setUserData(null))
        dispatch(setIsAuth(false))
        successToastr('Log out', 'Complited successfully', dispatch)
    } catch (error) {
        errorToastr(error as Error, 'Log out error', dispatch)
    }
})

export const forgotPassTC = createAsyncThunk<void, { email: string, redirect: () => void }>('auth/forgotPass',
    async ({email, redirect}, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await authService.forgotPass(email)
            successToastr('Instructions sent', 'Check your email', dispatch)
            redirect()
        } catch (error) {
            errorToastr(error as Error, 'Forgot password error', dispatch)
        }
    })

export const setNewPassTC = createAsyncThunk<void, { password: string, resetPasswordToken: string }>('auth/set-pass',
    async (data, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await authService.setNewPass(data).then(data => alert(data.info))
            successToastr('Password updated', 'Follow the login page', dispatch)
        } catch (error) {
            errorToastr(error as Error, 'New password setting error', dispatch)
        }
    })

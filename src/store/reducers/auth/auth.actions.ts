import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../../../services/auth.service";
import {errorUtils} from "../../../utils/errors";
import {setAuthError, setAuthStatus, setIsRegistered} from "./auth.slice";
import {ILoginData} from "../../../types/auth";
import {setIsAuth, setUserData} from "../user/user.slice";

export const registerTC = createAsyncThunk<void, { email: string, password: string, redirect: () => void }>('auth/register',
    async ({email, password, redirect}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAuthStatus('loading'))
            await authService.registration(email, password)
            dispatch(setAuthStatus('succeeded'))
            redirect()
            dispatch(setIsRegistered(true))
        } catch (error) {
            if (error instanceof Error) {
                errorUtils(error, dispatch, setAuthError)
                dispatch(setAuthStatus('failed'))
            }
        }
    }
)

export const loginTC = createAsyncThunk<void, ILoginData>('auth/login',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAuthStatus('loading'))
            await authService.login(data)
            await dispatch(authMeTC())
            dispatch(setAuthStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                errorUtils(error, dispatch, setAuthError)
                dispatch(setAuthStatus('failed'))
            }
        }
    }
)

export const authMeTC = createAsyncThunk('auth/me', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await authService.authMe()
        dispatch(setUserData(response))
        dispatch(setIsAuth(true))
    } catch (error) {
        if (error instanceof Error) {
            errorUtils(error, dispatch, setAuthError)
            dispatch(setAuthStatus('failed'))
        }
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        await authService.logout()
        dispatch(setUserData(null))
        dispatch(setIsAuth(false))
    } catch (error) {
        if (error instanceof Error) {
            errorUtils(error, dispatch, setAuthError)
            dispatch(setAuthStatus('failed'))
        }
    }
})

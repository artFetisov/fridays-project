import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../../../services/auth.service";
import {errorUtils} from "../../../utils/errors";
import {setAuthError, setAuthStatus, setIsRegistered} from "./auth.slice";

export const registerTC = createAsyncThunk<void, { email: string, password: string }>('auth/register',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAuthStatus('loading'))
            const response = await authService.register(email, password)
            dispatch(setAuthStatus('succeeded'))
            dispatch(setIsRegistered(true))
        } catch (error) {
            if (error instanceof Error) {
                errorUtils(error, dispatch, setAuthError)
                dispatch(setAuthStatus('failed'))
            }
        }
    }
)
//
// export const authMeTC = createAsyncThunk<IAuthMeResponse | undefined>('auth/me',
//     async (_, {dispatch, rejectWithValue}) => {
//         try {
//             dispatch(setAppStatus('loading'))
//             const response = await AuthService.me()
//             if (response.data.resultCode === ResultCodeEnum.Success) {
//                 dispatch(setAppStatus('succeeded'))
//                 return response.data.data
//
//             } else if (response.data.resultCode === ResultCodeEnum.Error) {
//                 dispatch(setAppStatus('failed'))
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 dispatch(setAppError(error.message))
//                 return rejectWithValue(error.message)
//             }
//         }
//     })

// export const loginTC = createAsyncThunk<void, IAuthData>('auth/login', async (data, {dispatch, rejectWithValue}) => {
//     try {
//         const response = await AuthService.login(data.email, data.password, data.rememberMe, data.captcha)
//         if (response.data.resultCode === ResultCodeEnum.Success) {
//             await dispatch(authMeTC())
//         } else if (response.data.resultCode === ResultCodeEnum.Error) {
//             dispatch(setAppError(response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occurred'))
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             dispatch(setAppError(error.message))
//             return rejectWithValue(error.message)
//         }
//     }
// })

// export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
//     try {
//         const response = await AuthService.logout()
//         if (response.data.resultCode === ResultCodeEnum.Error) {
//             dispatch(setAppError(response.data.messages[0]))
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             dispatch(setAppError(error.message))
//             return rejectWithValue(error.message)
//         }
//     }
// })

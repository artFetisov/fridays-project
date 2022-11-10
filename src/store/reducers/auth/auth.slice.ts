import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "./auth.types";
import {RequestStatusType} from "../../../types/auth";

const initialState: IAuthState = {
    authError: null,
    authStatus: 'idle',
    isRegistered: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthError(state, action: PayloadAction<string | null>) {
            state.authError = action.payload
        },
        setAuthStatus(state, action: PayloadAction<RequestStatusType>) {
            state.authStatus = action.payload
        },
        setIsRegistered(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        }
    },
    extraReducers: builder => {
        // builder.addCase(authMeTC.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         const {id, email, login} = action.payload
        //         state.isAuth = true
        //         state.id = id
        //         state.login = login
        //         state.email = email
        //     }
        // })
        // builder.addCase(logoutTC.fulfilled, (state) => {
        //     state.isAuth = false
        //     state.id = null
        //     state.login = null
        //     state.email = null
        // })
    }
})


export const {setAuthError, setAuthStatus, setIsRegistered} = authSlice.actions

export const {reducer} = authSlice
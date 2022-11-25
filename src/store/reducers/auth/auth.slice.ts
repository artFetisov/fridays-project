import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../../types/auth";

interface IAuthState {
    authError: string | null
    authStatus: RequestStatusType
    isRegistered: boolean
}

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
})

export const {setAuthError, setAuthStatus, setIsRegistered} = authSlice.actions

export const {reducer} = authSlice
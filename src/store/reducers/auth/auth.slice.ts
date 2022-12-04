import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../../types/auth";

interface IAuthState {
    isAuth: boolean
}

const initialState: IAuthState = {
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    },
})

export const {setIsAuth} = authSlice.actions

export const {reducer} = authSlice
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginResponse, RequestStatusType} from "../../../types/auth";
import {IUserState} from "./user.types";

const initialState: IUserState = {
    user: null,
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<ILoginResponse | null>) {
            state.user = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    },
})


export const {setUserData, setIsAuth} = userSlice.actions

export const {reducer} = userSlice
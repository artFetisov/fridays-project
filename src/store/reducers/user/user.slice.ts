import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginResponse} from "../../../types/auth";

interface IUserState {
    user: ILoginResponse | null

}

const initialState: IUserState = {
    user: null,

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<ILoginResponse | null>) {
            state.user = action.payload
        },

    },
})


export const {setUserData} = userSlice.actions

export const {reducer} = userSlice
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginResponse, RequestStatusType} from "../../../types/auth";

interface IUserState {
    user: ILoginResponse | null
    userRequestStatus: RequestStatusType
}

const initialState: IUserState = {
    user: null,
    userRequestStatus: 'idle'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<ILoginResponse | null>) {
            state.user = action.payload
        },
        setUserStatus(state, action: PayloadAction<RequestStatusType>) {
            state.userRequestStatus = action.payload
        }
    },
})


export const {setUserData, setUserStatus} = userSlice.actions

export const {reducer} = userSlice
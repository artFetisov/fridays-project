import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../../types/auth";

interface IAppState {
    isInitialized: boolean
    appStatus: RequestStatusType
}

const initialState: IAppState = {
    isInitialized: false,
    appStatus: 'idle'
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsInitialized(state) {
            state.isInitialized = true
        },
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.appStatus = action.payload
        }
    },

})

export const {setIsInitialized, setAppStatus} = appSlice.actions

export const {reducer} = appSlice
import {createSlice} from "@reduxjs/toolkit";
import {IAppState} from "./app.types";

const initialState: IAppState = {
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsInitialized(state) {
            state.isInitialized = true
        }
    },

})

export const {setIsInitialized} = appSlice.actions

export const {reducer} = appSlice
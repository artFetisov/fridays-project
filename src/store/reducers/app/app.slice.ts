import {createSlice} from "@reduxjs/toolkit";

interface IAppState {
    isInitialized: boolean
}

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
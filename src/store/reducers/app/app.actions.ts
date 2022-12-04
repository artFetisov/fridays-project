import {createAsyncThunk} from "@reduxjs/toolkit";
import {authMeTC} from "../auth/auth.actions";
import {setAppStatus, setIsInitialized} from "./app.slice";
import {errorToastr} from "../../../utils/toastr";

export const appInitializedTC = createAsyncThunk('app/initialized', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await dispatch(authMeTC())
        Promise.all([response]).then(() => {
            dispatch(setIsInitialized())
        })
        dispatch(setAppStatus('succeeded'))
    } catch (error) {
        errorToastr(error as Error, '', dispatch)
    }
})
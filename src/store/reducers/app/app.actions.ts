import {createAsyncThunk} from "@reduxjs/toolkit";
import {authMeTC} from "../auth/auth.actions";
import {setIsInitialized} from "./app.slice";
import {errorToastr} from "../../../utils/errors";
import {setAuthStatus} from "../auth/auth.slice";

export const appInitializedTC = createAsyncThunk('app/initialized', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await dispatch(authMeTC())
        Promise.all([response]).then(() => {
            dispatch(setIsInitialized())
        })
    } catch (error) {
        if (error instanceof Error) errorToastr(error)
        dispatch(setAuthStatus('failed'))

    }
})
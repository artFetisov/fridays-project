import {createAsyncThunk} from "@reduxjs/toolkit";
import {authMeTC} from "../auth/auth.actions";
import {setIsInitialized} from "./app.slice";
import {errorUtils} from "../../../utils/errors";
import {setAuthError, setAuthStatus} from "../auth/auth.slice";

export const appInitializedTC = createAsyncThunk('app/initialized', async (_, {dispatch, rejectWithValue}) => {
    try {
        const response = await dispatch(authMeTC())
        Promise.all([response]).then(() => {
            dispatch(setIsInitialized())
        })
    } catch (error) {
        if (error instanceof Error) {
            errorUtils(error, dispatch, setAuthError)
            dispatch(setAuthStatus('failed'))
        }
    }
})
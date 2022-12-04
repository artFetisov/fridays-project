import axios, {AxiosError} from "axios";
import {toastr} from "react-redux-toastr";
import {Dispatch} from "redux";
import {RequestStatusType} from "../types/auth";
import {setAppStatus} from "../store/reducers/app/app.slice";

export const errorToastr = (e: Error | AxiosError<{ error: string }>, title: string = 'Error', dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string, info: string }>
    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response?.data?.error : err.message
        // @ts-ignore
        const error2 = err.response?.data?.info ? err.response?.data?.info : ''
        // const errorInfo = err.response?.data && err.
        toastr.error(title, `${error}, ${error2 && error2}`)
        dispatch(setAppStatus('failed'))
    } else {
        toastr.error('Native Error', err.message)
    }
}

export const successToastr = (title: string, description: string, dispatch: Dispatch) => {
    toastr.error(title, description)
    dispatch(setAppStatus('succeeded'))
}
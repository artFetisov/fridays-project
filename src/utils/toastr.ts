import axios, {AxiosError} from "axios";
import {toastr} from "react-redux-toastr";
import {AnyAction, Dispatch} from "redux";

export const errorToastr = (e: Error | AxiosError<{ error: string }>, title: string = 'Error', dispatch: Dispatch, cb: AnyAction) => {
    const err = e as Error | AxiosError<{ error: string, info: string }>
    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response?.data?.error : err.message
        // @ts-ignore
        const error2 = err.response?.data?.info ? err.response?.data?.info : ''
        // const errorInfo = err.response?.data && err.
        toastr.error(title, `${error}, ${error2 && error2}`)
        dispatch(cb)
    } else {
        toastr.error('Native Error', err.message)
    }
}

export const successToastr =
    (title: string, description: string, dispatch: Dispatch, cb: AnyAction) => {
        toastr.success(title, description)
        dispatch(cb)
    }
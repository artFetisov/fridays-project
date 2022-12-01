import axios, {AxiosError} from "axios";
import {toastr} from "react-redux-toastr";

export const errorToastr = (e: Error | AxiosError<{ error: string }>) => {
    const err = e as Error | AxiosError<{ error: string, info: string }>
    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response?.data?.error : err.message
        // @ts-ignore
        const error2 = err.response?.data?.info ? err.response?.data?.info : ''
        // const errorInfo = err.response?.data && err.
        toastr.error('Error', `${error}, ${error2 && error2}`)
    } else {
        toastr.error('Native Error', err.message)
    }
}

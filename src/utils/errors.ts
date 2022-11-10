import {AnyAction, Dispatch} from "redux";
import axios, {AxiosError} from "axios";

export const errorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch<any>, cb: (value: string | null) => void) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response?.data?.error : err.message
        console.log(error)
        dispatch(cb(error))
    } else {
        dispatch(cb(`Native error ${err.message}`))
    }
}
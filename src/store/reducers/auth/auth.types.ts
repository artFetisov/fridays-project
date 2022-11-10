import {RequestStatusType} from "../../../types/auth";

export interface IAuthState {
    authError: string | null
    authStatus: RequestStatusType
    isRegistered: boolean
}

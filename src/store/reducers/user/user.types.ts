import {ILoginResponse} from "../../../types/auth";

export interface IUserState {
    user: ILoginResponse | null
    isAuth: boolean
}
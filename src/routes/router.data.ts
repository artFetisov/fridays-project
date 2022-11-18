import {FC} from "react";
import {LoginPage} from "../components/pages/LoginPage/LoginPage";
import {RegisterPage} from "../components/pages/RegisterPage/RegisterPage";
import {ProfilePage} from "../components/pages/ProfilePage/ProfilePage";
import {MainPage} from "../components/pages/MainPage";
import {ForgotPasswordPage} from "../components/pages/ForgotPasswordPage/ForgotPasswordPage";
import {CheckEmailPage} from "../components/pages/CheckEmailPage/CheckEmailPage";
import {NewPasswordPage} from "../components/pages/NewPasswordPage/NewPasswordPage";

export enum PATH {
    MAIN = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    ERROR = '/404',
    FORGOT = '/forgotPassword',
    CHECK = 'check-email',
    NEW_PASS = 'new-pass'
}

export interface IRoute {
    path: string
    element: FC
}


export const publicRoutes: IRoute[] = [
    {path: PATH.MAIN, element: MainPage},
    {path: PATH.PROFILE, element: ProfilePage},
]

export const privateRoutes: IRoute[] = [
    {path: PATH.LOGIN, element: LoginPage},
    {path: PATH.REGISTRATION, element: RegisterPage},
    {path: PATH.FORGOT, element: ForgotPasswordPage},
    {path: PATH.CHECK, element: CheckEmailPage},
    {path: PATH.NEW_PASS, element: NewPasswordPage}
]
import {FC} from "react";
import {LoginPage} from "../components/pages/LoginPage/LoginPage";
import {RegisterPage} from "../components/pages/RegisterPage/RegisterPage";
import {ProfilePage} from "../components/pages/ProfilePage/ProfilePage";
import {TestPage} from "../components/pages/TestPage";
import {NewPasswordEntryPage} from "../components/pages/NewPasswordEntryPage";
import {PasswordRecoveryPage} from "../components/pages/PasswordRecoveryPage";
import {Page404} from "../components/pages/404Page";
import {MainPage} from "../components/pages/MainPage";

export enum PATH {
    MAIN = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    ERROR = '/404'
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
    {path: '/auth', element: TestPage},
    {path: '/pass-entry', element: NewPasswordEntryPage},
    {path: '/pass-recovery', element: PasswordRecoveryPage},
]
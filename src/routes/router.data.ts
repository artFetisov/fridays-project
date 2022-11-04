import {FC} from "react";
import {LoginPage} from "../components/pages/LoginPage";
import {RegisterPage} from "../components/pages/RegisterPage";
import {ProfilePage} from "../components/pages/ProfilePage";
import {TestPage} from "../components/pages/TestPage";
import {NewPasswordEntryPage} from "../components/pages/NewPasswordEntryPage";
import {PasswordRecoveryPage} from "../components/pages/PasswordRecoveryPage";
import {Page404} from "../components/pages/404Page";
import {MainPage} from "../components/pages/MainPage";

export interface IRoute {
    path: string
    element: FC

}

export const publicRoutes: IRoute[] = [
    {path: '/', element: MainPage},
    {path: 'login', element: LoginPage},
    {path: '/register', element: RegisterPage},
    {path: '/profile', element: ProfilePage},
    {path: '/test', element: TestPage},
    {path: '/pass-entry', element: NewPasswordEntryPage},
    {path: '/pass-recovery', element: PasswordRecoveryPage},
    {path: '/404', element: Page404},
]

export const privateRoutes: IRoute[] = []
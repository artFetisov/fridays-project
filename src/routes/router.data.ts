import {FC} from "react";
import {LoginPage} from "../components/pages/LoginPage/LoginPage";
import {RegisterPage} from "../components/pages/RegisterPage/RegisterPage";
import {ProfilePage} from "../components/pages/ProfilePage/ProfilePage";
import {ForgotPasswordPage} from "../components/pages/ForgotPasswordPage/ForgotPasswordPage";
import {CheckEmailPage} from "../components/pages/CheckEmailPage/CheckEmailPage";
import {NewPasswordPage} from "../components/pages/NewPasswordPage/NewPasswordPage";
import {PacksPage} from "../components/pages/PacksPage/PacksPage";
import {CardsPage} from "../components/pages/CardsPage/CardsPage";
import {LearnPackPage} from "../components/pages/LearnPackPage/LearnPackPage";

export enum PATH {
    PACKS = '/packs',
    CARDS = '/cards/:packId',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    ERROR = '/404',
    FORGOT = '/forgotPassword',
    CHECK = '/check-email',
    NEW_PASS = '/new-pass/:token',
    LEARN_PACK = '/learn-pack/:packId'
}

export interface IRoute {
    path: string
    element: FC
}

export const privateRoutes: IRoute[] = [
    {path: PATH.PACKS, element: PacksPage},
    {path: PATH.PROFILE, element: ProfilePage},
    {path: PATH.CARDS, element: CardsPage},
    {path: PATH.LEARN_PACK, element: LearnPackPage}
]

export const publicRoutes: IRoute[] = [
    {path: PATH.LOGIN, element: LoginPage},
    {path: PATH.REGISTRATION, element: RegisterPage},
    {path: PATH.FORGOT, element: ForgotPasswordPage},
    {path: PATH.CHECK, element: CheckEmailPage},
    {path: PATH.NEW_PASS, element: NewPasswordPage}
]
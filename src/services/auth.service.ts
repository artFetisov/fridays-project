import {instance} from "../api/axios";
import {ILoginData, ILoginResponse} from "../types/auth";

export const authService = {
    async registration(email: string, password: string) {
        return instance.post('auth/register', {email, password}).then(data => data.data)
    },
    async login(data: ILoginData) {
        return instance.post<ILoginResponse>('auth/login', data).then(data => data.data)
    },
    async logout() {
        return instance.delete<{ info: string, error: string }>('auth/me').then(data => data.data)
    },
    async authMe() {
        return instance.post<ILoginResponse>('auth/me').then(data => data.data)
    }
}
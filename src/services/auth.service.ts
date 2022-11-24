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
    },
    async forgotPass(email: string) {
        const data = {
            email,
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://artfetisov.github.io/fridays-project/#/new-pass/$token$'>
            link</a>
            </div>`,
            from: "test-front-admin <ai73a@yandex.by>",
        }

        return instance.post<{ info: string, error: string }>('auth/forgot', data).then(data => data.data)
    },
    async setNewPass(data: { password: string, resetPasswordToken: string }) {
        return instance.post<{ info: string, error: string }>('auth/set-new-password', data).then(data => data.data)
    }
}
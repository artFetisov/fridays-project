import {instance} from "../api/axios";

export const authService = {
    async register(email: string, password: string) {
        return instance.post('auth/register', {email, password}).then(data => data.data)
    }
}
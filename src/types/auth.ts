export interface IRegisterData {
    email: string
    password: string
    confirmPassword: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export interface IRegisterData {
  email: string
  password: string
  confirmPassword: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface ILoginData {
  email: string
  password: string
  rememberMe: boolean
}

export interface ILoginResponse {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

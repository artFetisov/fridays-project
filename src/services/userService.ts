import { instance } from '../api/axios'
import { ILoginResponse } from '../types/auth'

export const userService = {
  async updateUserData(data: { name?: string; avatar: ArrayBuffer | string }) {
    return await instance
      .put<{ updatedUser: ILoginResponse }>('auth/me', data)
      .then(data => data.data)
  },
}

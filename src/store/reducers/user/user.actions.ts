import { createAsyncThunk } from '@reduxjs/toolkit'

import { userService } from '../../../services/userService'
import { errorToastr, successToastr } from '../../../utils/toastr'
import { AppRootState } from '../../index'
import { authMeTC } from '../auth/auth.actions'

import { setUserData, setUserStatus } from './user.slice'

export const updateUserDataTC = createAsyncThunk<
  void,
  { name: string; avatar: ArrayBuffer | string; redirect: () => void },
  { state: AppRootState }
>('user/updateData', async (data, { dispatch }) => {
  try {
    dispatch(setUserStatus('loading'))
    await dispatch(authMeTC({ redirect: data.redirect }))
    const response = await userService.updateUserData(data)

    dispatch(setUserData(response.updatedUser))
    successToastr('Update profile', 'update was successful', dispatch, setUserStatus('succeeded'))
  } catch (error) {
    errorToastr(error as Error, 'Update error', dispatch, setUserStatus('failed'))
  }
})

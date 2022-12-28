import { createAsyncThunk } from '@reduxjs/toolkit'

import { errorToastr } from '../../../utils/toastr'
import { authMeTC } from '../auth/auth.actions'

import { setAppStatus, setIsInitialized } from './app.slice'

export const appInitializedTC = createAsyncThunk('app/initialized', async (_, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    const response = await dispatch(authMeTC({}))

    Promise.all([response]).then(() => {
      dispatch(setIsInitialized())
    })
    dispatch(setAppStatus('succeeded'))
  } catch (error) {
    errorToastr(error as Error, '', dispatch, setAppStatus('failed'))
  }
})

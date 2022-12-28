import { configureStore } from '@reduxjs/toolkit'

import { reducers } from './reducers/rootReducer'

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>

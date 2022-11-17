import {reducer as authReducer} from './auth/auth.slice'
import {reducer as userReducer} from './user/user.slice'
import {reducer as appReducer} from './app/app.slice'

export const reducers = {
    auth: authReducer,
    user: userReducer,
    app: appReducer
}
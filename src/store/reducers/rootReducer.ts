import {reducer as authReducer} from './auth/auth.slice'
import {reducer as userReducer} from './user/user.slice'
import {reducer as appReducer} from './app/app.slice'
import {reducer as packReducer} from './pack/pack.slice'
import {reducer as cardReducer} from './card/card.slice'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {reducer as modalReducer} from './modal/modal.slice'

export const reducers = {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    pack: packReducer,
    card: cardReducer,
    modal: modalReducer,
    toastr: toastrReducer
}
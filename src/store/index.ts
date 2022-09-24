import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import reducers from './reducers'
import {TestActions} from "./reducers/test/types";

const rootReducer = combineReducers(reducers)

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppRootActions>
export type AppRootActions = TestActions
export type AppRootThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActions>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

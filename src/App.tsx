import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC, useEffect} from "react";
import React from "react";
import {CustomizedSnackBar} from "./components/ui/snack-bar/SnackBar";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appInitializedTC} from "./store/reducers/app/app.actions";

export const App: FC = () => {
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('work')
        dispatch(appInitializedTC())
    }, [])

    return <>
        {isInitialized
            ? <div>
                <CustomizedSnackBar/>
                <Layout>
                    <Router/>
                </Layout>
            </div>
            : <div>...Loading</div>
        }
    </>
}

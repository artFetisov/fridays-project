import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC, useEffect} from "react";
import React from "react";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appInitializedTC} from "./store/reducers/app/app.actions";
import {LayoutModal} from "./components/ui/modal/LayoutModal";
import {MyTopProgressBar} from "./components/ui/top-progress-bar/MyTopProgressBar";


export const App: FC = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appInitializedTC())
    }, [])


    return <>
        <div style={{width: '100%'}}>
            {appStatus === 'loading' && <MyTopProgressBar/>}
        </div>
        <>
            <LayoutModal/>
        </>
        {isInitialized
            ? <div>
                <Layout>
                    <Router/>
                </Layout>
            </div>
            : <div>...Loading</div>
        }
    </>
}

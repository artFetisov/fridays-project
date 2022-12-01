import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC, useEffect} from "react";
import React from "react";
import {CustomizedSnackBar} from "./components/ui/snack-bar/SnackBar";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appInitializedTC} from "./store/reducers/app/app.actions";
import {LayoutModal} from "./components/ui/modal/LayoutModal";

export const App: FC = () => {
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(appInitializedTC())
    }, [])


    return <>
        <>
            <LayoutModal/>
        </>
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

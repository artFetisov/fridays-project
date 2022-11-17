import React, {FC} from "react";
import {PATH, privateRoutes, publicRoutes} from "./router.data";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector";

export const Router: FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)

    return <>
        {isAuth && <Routes>
            {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
            <Route path="*" element={<Navigate to={PATH.PROFILE}/>}/>
        </Routes>}
        {!isAuth && <Routes>
            {privateRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
            <Route path="*" element={<Navigate to={PATH.LOGIN}/>}/>
        </Routes>}
    </>
}
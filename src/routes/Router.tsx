import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./router.data";
import {MainPage} from "../components/pages/MainPage";

export const Router: FC = () => {

    return <Routes>
        {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
        {/*<Route path="/" element={<MainPage/>}/>*/}
        {/*<Route path="*" element={<Navigate to={`/404`}/>}/>*/}
    </Routes>
}
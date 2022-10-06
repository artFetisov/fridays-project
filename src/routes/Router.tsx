import React, {FC} from "react";
import {publicRoutes} from "./router.data";
import {Navigate, Route, Routes} from "react-router-dom";

export const Router: FC = () => {

    return <Routes>
        {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
        <Route path="*" element={<Navigate to={`/404`}/>}/>
    </Routes>
}
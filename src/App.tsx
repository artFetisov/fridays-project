import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC} from "react";
import React from "react";
import {CustomizedSnackBar} from "./components/ui/snack-bar/SnackBar";

export const App: FC = () => {
    return <div>
        <CustomizedSnackBar/>
        <Layout>
            <Router/>
        </Layout>
    </div>
}

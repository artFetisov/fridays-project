import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC} from "react";
import {NavLink} from "react-router-dom";
import {publicRoutes} from "./routes/router.data";

export const App: FC = () => {
    return <div>
        <Layout>
            <Router/>
        </Layout>
    </div>
}

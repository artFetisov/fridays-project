import {Layout} from "./components/layout/Layout";
import {Router} from "./routes/Router";
import {FC} from "react";

export const App: FC = () => {
    return <div>
        <Layout>
            <Router/>
        </Layout>
    </div>
}

import {FC, ReactNode} from "react";
import {Header} from "./Header/Header";

export const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return <div>
        <Header/>
        {children}
    </div>
}
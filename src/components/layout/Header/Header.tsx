import React, {FC} from "react";
import styles from './Header.module.scss';
import {Label} from "./Label";
import {Button} from "../../ui/button/Button";
import {useLocation} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Avatar} from "@mui/material";

export const Header: FC = () => {
    const {isAuth, user} = useAppSelector(state => state.user)
    const {pathname} = useLocation()

    return <header className={styles.header}>
        <Label/>
        {isAuth && <div className={styles.name}>
            <span>{user?.name}</span>
        </div>}
        {!isAuth && <Button>
            {pathname === PATH.LOGIN && 'Sign In'}
            {pathname === PATH.REGISTRATION && 'Sign Up'}
        </Button>}
        {isAuth && <Avatar style={{marginLeft: '12px'}} sx={{width: 36, height: 36}} alt="Travis Howard"
                           src={user?.avatar || "/static/images/avatar/2.jpg"}/>}
    </header>
}
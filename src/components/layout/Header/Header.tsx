import React, {FC} from "react";
import styles from './Header.module.scss';
import {Label} from "./Label";
import {Button} from "../../ui/button/Button";
import {Link, useLocation} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Avatar} from "@mui/material";
import {MyTooltip} from "../../ui/tooltip/MyTooltip";
import {ProfileTooltip} from "../../ui/tooltip/ProfileTooltip";

export const Header: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const user = useAppSelector(state => state.user.user)
    const {pathname} = useLocation()

    return <header className={styles.header}>
        <Label/>
        {isAuth && <div className={styles.name}>
            <span>{user?.name}</span>
        </div>}
        {!isAuth && <Button disabled>
            {(pathname !== PATH.REGISTRATION && !isAuth) && 'Sign In'}
            {pathname === PATH.REGISTRATION && 'Sign Up'}
        </Button>}
        {isAuth && <>
            {pathname === PATH.PROFILE ? <Link to={PATH.PROFILE}>
                <Avatar style={{marginLeft: '12px'}} sx={{width: 36, height: 36}} alt="Travis Howard"
                        src={user?.avatar || "/static/images/avatar/2.jpg"}/>
            </Link> : <MyTooltip element={<ProfileTooltip/>}>
                <Link to={PATH.PROFILE}>
                    <Avatar style={{marginLeft: '12px'}} sx={{width: 36, height: 36}} alt="Travis Howard"
                            src={user?.avatar || "/static/images/avatar/2.jpg"}/>
                </Link>
            </MyTooltip>}
        </>
        }
    </header>
}
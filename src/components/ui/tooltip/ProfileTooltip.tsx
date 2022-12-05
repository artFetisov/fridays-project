import React, {FC} from "react";
import styles from './Tooltip.module.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutTC} from "../../../store/reducers/auth/auth.actions";

export const ProfileTooltip: FC = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    return <div className={styles.headerTooltip}>
        <div>
            <Link to={PATH.PROFILE} className={styles.box}>
                <div className={styles.iconBox}><PersonOutlineIcon style={{color: '#000000'}}/></div>
                <span className={styles.text}>Profile</span>
            </Link>
        </div>
        <div onClick={handleLogout} className={styles.box}>
            <div className={styles.iconBox}><LogoutIcon/></div>
            <span className={styles.text}>Log out</span>
        </div>
    </div>
}
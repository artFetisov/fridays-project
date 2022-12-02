import React, {FC} from "react";
import styles from './ButtonTooltip.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const EditTooltip: FC = () => {
    const navigate = useNavigate()
    const {packId} = useParams()

    const redirect = () => {
        navigate(`/learn-pack/${packId}`)
    }


    return <div className={styles.headerTooltip}>
        <div className={styles.box}>
            <div className={styles.iconBox}><BorderColorIcon fontSize={'small'}/></div>
            <span className={styles.text}>Edit</span>
        </div>
        <div className={styles.box}>
            <div className={styles.iconBox}><DeleteOutlineIcon fontSize={'small'}/></div>
            <span className={styles.text}>Delete</span>
        </div>
        <div className={styles.box} onClick={redirect}>
            <div className={styles.iconBox}><SchoolIcon fontSize={'small'}/></div>
            <span className={styles.text}>Learn</span>
        </div>


    </div>
}
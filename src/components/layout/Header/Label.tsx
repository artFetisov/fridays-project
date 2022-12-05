import React, {FC} from "react";
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {PATH} from "../../../routes/router.data";

export const Label: FC = () => {
    return <div className={styles.labelContainer}>
        <Link to={PATH.PACKS}>
            CARDS APP
        </Link>
    </div>
}
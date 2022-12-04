import React, {FC} from "react";
import styles from './CheckEmailPage.module.scss';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Button} from "../../ui/button/Button";
import {Link} from "react-router-dom";
import {PATH} from "../../../routes/router.data";

export const CheckEmailPage: FC = () => {
    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Check Email</h3>
            <div className={styles.circleWrapper}>
                <div className={styles.circle}>
                    <DraftsIcon fontSize={'large'}/>
                </div>
            </div>
            <div className={styles.text}>We`ve sent an Email with instructions to your email</div>
            <Link to={PATH.LOGIN}>
                <Button big>Back to login</Button>
            </Link>
        </div>
    </div>
}
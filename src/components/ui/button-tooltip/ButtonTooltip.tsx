import React, {FC} from "react";
import styles from './ButtonTooltip.module.scss';
import {EditTooltip} from "./EditTooltip";
import {MyTooltip} from "../tooltip/MyTooltip";
import {useAppSelector} from "../../../hooks/useAppSelector";
import cn from 'classnames';

export const ButtonTooltip: FC = () => {
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isloading = appStatus === 'loading'

    return <MyTooltip element={<EditTooltip/>}>
        <div className={cn(styles.customButton, {
            [styles.disabled]: isloading
        })}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </MyTooltip>
}
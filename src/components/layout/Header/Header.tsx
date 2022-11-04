import {FC} from "react";
import styles from './Header.module.scss';
import {Label} from "./Label";

export const Header: FC = () => {
    return <header className={styles.header}>
        <Label/>
    </header>
}
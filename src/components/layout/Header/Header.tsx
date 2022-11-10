import React,{FC} from "react";
import styles from './Header.module.scss';
import {Label} from "./Label";
import {Button} from "../../ui/button/Button";

export const Header: FC = () => {
    return <header className={styles.header}>
        <Label/>
        <Button>Sign in</Button>
    </header>
}
import React, {FC} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import styles from './PacksTable.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {PackItem} from "./PackItem";

export const PacksTable: FC = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.pack.cardPacks)

    return <div className={styles.tableContainer}>
        <div className={styles.titles}>
            <span>Name</span>
            <span>Cards</span>
            <span>Last Updated</span>
            <span>Created by</span>
            <span>Actions</span>
        </div>
        <div className={styles.packs}>
            {packs.map(pack => <PackItem key={pack._id} pack={pack}/>)}
        </div>
    </div>
}
import React, {FC} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import styles from './PacksTable.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {PackItem} from "./PackItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {setSortPacks} from "../../../store/reducers/pack/pack.slice";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";

export const PacksTable: FC = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.pack.cardPacks)
    const sortPacks = useAppSelector(state => state.pack.sortPacks)

    const handleChangeSortPacksUp = () => {
        dispatch(setSortPacks('0updated'))
        dispatch(getAllPacksTC())
    }

    const handleChangeSortPacksDown = () => {
        dispatch(setSortPacks('1updated'))
        dispatch(getAllPacksTC())
    }

    if (!packs.length) {
        return <div className={styles.notFound}>Packs with the entered parameters were not found. Change the request
            parameters</div>
    }

    return <div className={styles.tableContainer}>
        <div className={styles.titles}>
            <span>Name</span>
            <span>Cards</span>
            <span className={styles.menuBox}>Last Updated {sortPacks === '0updated'
                ? <ArrowDropDownIcon onClick={handleChangeSortPacksDown} cursor={'pointer'}/>
                : <ArrowDropUpIcon onClick={handleChangeSortPacksUp} cursor={'pointer'}/>}
            </span>
            <span>Created by</span>
            <span>Actions</span>
        </div>
        <div className={styles.packs}>
            {packs.map(pack => <PackItem key={pack._id} pack={pack}/>)}
        </div>
    </div>
}
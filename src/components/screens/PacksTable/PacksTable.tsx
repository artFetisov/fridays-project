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

    const handleChangeSortPacksUpdatedFieldUp = () => {
        dispatch(setSortPacks('0updated'))
        dispatch(getAllPacksTC())
    }

    const handleChangeSortPacksUpdatedFieldDown = () => {
        dispatch(setSortPacks('1updated'))
        dispatch(getAllPacksTC())
    }

    const handleChangeSortPacksCardsAmountUp = () => {
        dispatch(setSortPacks('0cardsCount'))
        dispatch(getAllPacksTC())
    }

    const handleChangeSortPacksCardsAmountDown = () => {
        dispatch(setSortPacks('1cardsCount'))
        dispatch(getAllPacksTC())
    }

    if (!packs.length) {
        return <div className={styles.notFound}>Packs with the entered parameters were not found. Change the request
            parameters</div>
    }

    return <div className={styles.tableContainer}>
        <div className={styles.titles}>
            <span>Name</span>
            <span className={styles.menuBox}>Cards {sortPacks === '0cardsCount'
                ? <ArrowDropDownIcon onClick={handleChangeSortPacksCardsAmountDown} cursor={'pointer'}/>
                : <ArrowDropUpIcon onClick={handleChangeSortPacksCardsAmountUp} cursor={'pointer'}/>}
            </span>
            <span className={styles.menuBox}>Last Updated {sortPacks === '0updated'
                ? <ArrowDropDownIcon onClick={handleChangeSortPacksUpdatedFieldDown} cursor={'pointer'}/>
                : <ArrowDropUpIcon onClick={handleChangeSortPacksUpdatedFieldUp} cursor={'pointer'}/>}
            </span>
            <span>Created by</span>
            <span>Actions</span>
        </div>
        <div className={styles.packs}>
            {packs.map(pack => <PackItem key={pack._id} pack={pack}/>)}
        </div>
    </div>
}
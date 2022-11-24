import React, {FC, useState} from "react";
import {Pagination} from "@mui/material";
import styles from './Paginator.module.scss';
import {MySelect} from "../select/MySelect";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setCurrentPage} from "../../../store/reducers/pack/pack.slice";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";

export const Paginator: FC = () => {
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const page = useAppSelector(state => state.pack.page)
    const pageCount = useAppSelector(state => state.pack.pageCount)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
        dispatch(getAllPacksTC())
    };


    const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    return (
        <div className={styles.paginatorBox}>
            <Pagination count={pagesCount} page={page} onChange={handleChange}/>
            <span>Show</span>
            <MySelect/>
            <span>Cards per Page</span>
        </div>
    );
}
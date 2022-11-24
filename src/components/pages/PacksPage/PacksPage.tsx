import React, {FC, useEffect} from "react";
import {createPackTC, getAllPacksTC} from "../../../store/reducers/pack/pack.actions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import styles from './PacksPage.module.scss';
import {Button} from "../../ui/button/Button";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {ButtonGroup} from "../../ui/button-group/ButtonGroup";
import {MyRangeSlider} from "../../ui/range-slider/MyRangeSlider";
import {PacksTable} from "../../screens/PacksTable/PacksTable";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Paginator} from "../../ui/pagination/Paginator";


export const PacksPage: FC = () => {
    const packsStatus = useAppSelector(state => state.pack.packStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllPacksTC())
    }, [])

    const handleCreatePack = () => {
        const name = 'test pack 3'
        dispatch(createPackTC({name}))
    }

    return <div className={styles.packsContainer}>
        <div className={styles.topBox}>
            <h3 className={styles.title}>Packs list</h3>
            <Button onClick={handleCreatePack}>Add new pack</Button>
        </div>
        <div className={styles.paramsBox}>
            <span>Search</span>
            <span>Show packs cards</span>
            <span>Number of cards</span>
        </div>
        <div className={styles.paramsBox}>
            <MySearchInput/>
            <ButtonGroup/>
            <MyRangeSlider/>
        </div>
        {packsStatus === 'loading' ? 'Loading...' : <PacksTable/>}
        <Paginator/>
    </div>
}
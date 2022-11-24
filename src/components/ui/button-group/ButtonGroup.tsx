import React, {FC, useState, MouseEvent} from "react";
import styles from './ButtonGroup.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setVariantMyOrAllPacks} from "../../../store/reducers/pack/pack.slice";
import {IVariantMyOrAllPacks} from "../../../types/packs";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";

export const ButtonGroup: FC = () => {
    const dispatch = useAppDispatch()
    const variant = useAppSelector(state => state.pack.variantMyOrAllPacks)


    const changeVariantHandler = (event: MouseEvent<HTMLButtonElement>) => {
        dispatch(setVariantMyOrAllPacks(event.currentTarget.value as IVariantMyOrAllPacks))
        dispatch(getAllPacksTC())
    }

    return <div className={styles.buttonsBox}>
        <button className={`${variant === 'my' ? styles.blue : styles.white} ${styles.button}`} value={'my'}
                onClick={changeVariantHandler}>My
        </button>
        <button onClick={changeVariantHandler}
                className={`${variant === 'all' ? styles.blue : styles.white} ${styles.button}`} value={'all'}>All
        </button>
    </div>
}
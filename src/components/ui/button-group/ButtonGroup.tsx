import React, {FC, MouseEvent} from "react";
import styles from './ButtonGroup.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setMinAndMaxCurrentCardsCount, setVariantMyOrAllPacks} from "../../../store/reducers/pack/pack.slice";
import {IVariantMyOrAllPacks} from "../../../types/packs";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";
import cn from 'classnames';

export const ButtonGroup: FC = () => {
    const dispatch = useAppDispatch()
    const variant = useAppSelector(state => state.pack.variantMyOrAllPacks)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    const changeVariantHandler = (event: MouseEvent<HTMLButtonElement>) => {
        dispatch(setMinAndMaxCurrentCardsCount([0, 0]))
        dispatch(setVariantMyOrAllPacks(event.currentTarget.value as IVariantMyOrAllPacks))
        dispatch(getAllPacksTC())
    }

    return <div className={styles.buttonsBox}>
        <button disabled={isLoading}
                className={cn(styles.button, {
                    [styles.blue]: variant === 'my',
                    [styles.white]: variant !== 'my',
                    [styles.disabled]: isLoading
                })}
                value={'my'}
                onClick={changeVariantHandler}>My
        </button>
        <button disabled={isLoading}
                onClick={changeVariantHandler}
                className={cn(styles.button, {
                    [styles.blue]: variant !== 'my',
                    [styles.white]: variant === 'my',
                    [styles.disabled]: isLoading
                })}
                value={'all'}>All
        </button>
    </div>
}
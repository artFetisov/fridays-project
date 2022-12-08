import React, {SyntheticEvent, useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';
import styles from './MyRangeSlider.module.scss';
import {Box} from "@mui/material";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {resetParams, setMinAndMaxCurrentCardsCount} from "../../../store/reducers/pack/pack.slice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";
import cn from 'classnames';

const minDistance = 2;

export const MyRangeSlider = () => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.appStatus)
    const min = useAppSelector(state => state.pack.minCardsCount)
    const max = useAppSelector(state => state.pack.maxCardsCount)
    const currentMin = useAppSelector(state => state.pack.currentMinCardsCount)
    const currentMax = useAppSelector(state => state.pack.currentMaxCardsCount)

    const isLoading = appStatus === 'loading'

    const [value, setValue] = useState<number[]>([currentMin, currentMax])

    useEffect(() => {
        setValue([currentMin, currentMax])
    }, [currentMin, currentMax])

    const handleResetParams = () => {
        dispatch(resetParams())
        dispatch(getAllPacksTC({}))
    }

    const handleRange = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                dispatch(setMinAndMaxCurrentCardsCount([clamped, clamped + minDistance]))
                dispatch(getAllPacksTC({}))
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                dispatch(setMinAndMaxCurrentCardsCount([clamped - minDistance, clamped]))
                dispatch(getAllPacksTC({}))
            }
        } else {
            dispatch(setMinAndMaxCurrentCardsCount(newValue as number[]))
            dispatch(getAllPacksTC({}))
        }
    }

    const handleChange = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue as number[]);
        }
    }

    return (
        <div className={styles.rangeBox}>
            <div className={styles.value}>{value[0]}</div>
            <Box width={200}>
                <Slider
                    disabled={isLoading}
                    value={value}
                    max={max}
                    min={min}
                    color={'primary'}
                    onChange={handleChange}
                    // @ts-ignore
                    onChangeCommitted={handleRange}
                    disableSwap
                />
            </Box>
            <div className={styles.value}>{value[1]}</div>
            <div className={cn(styles.value, {
                    [styles.disabled]: isLoading
                }
            )} onClick={handleResetParams}>icon
            </div>
        </div>
    );
}
import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {setCardsPageCount, setOpenedPackId} from "../../../store/reducers/card/card.slice";
import {getCardsTC} from "../../../store/reducers/card/card.actions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setPageCount} from "../../../store/reducers/pack/pack.slice";

export const LearnPackPage: FC = () => {
    const [showAnswer, setShowAnswer] = useState(false)
    const dispatch = useAppDispatch()

    const {packId} = useParams()

    useEffect(() => {
        if (packId) {
            dispatch(setCardsPageCount(1000))
            dispatch(setOpenedPackId(packId))
            dispatch(getCardsTC())
        }

        return () => {
            dispatch(setCardsPageCount(10))
        }
    }, [])

    return <div>learn</div>
}
import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createCardTC, getCardsTC} from "../../../store/reducers/card/card.actions";
import styles from './CardsPage.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {SelectChangeEvent} from "@mui/material/Select";
import {
    setCardQuestionSearch,
    setCardsCurrentPage,
    setCardsPageCount, setIsEmptyCardQuestionSearchValue,
    setOpenedPackId
} from "../../../store/reducers/card/card.slice";
import {ICreateCardData} from "../../../types/cards";
import {useDebouncedCallback} from "use-debounce";
import {MyCards} from "../../screens/MyCards/MyCards";
import {FriendCards} from "../../screens/FriendCards/FriendCards";

export const CardsPage: FC = () => {
    const dispatch = useAppDispatch()

    const {packId} = useParams()

    const myId = useAppSelector(state => state.user.user?._id)
    const cards = useAppSelector(state => state.card.cards)
    const packName = useAppSelector(state => state.card.packName)
    const page = useAppSelector(state => state.card.page)
    const pageCount = useAppSelector(state => state.card.pageCount)
    const cardsTotalCount = useAppSelector(state => state.card.cardsTotalCount)
    const packUserId = useAppSelector(state => state.card.packUserId)
    const isEmptyCardQuestionSearchValue = useAppSelector(state => state.card.isEmptyCardQuestionSearchValue)

    const isMyPack = myId === packUserId

    useEffect(() => {
        if (packId) {
            dispatch(setOpenedPackId(packId))
            dispatch(getCardsTC())
        }

        return () => {
            dispatch(setCardQuestionSearch(''))
            dispatch(setIsEmptyCardQuestionSearchValue(false))
        }
    }, [packId])

    const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsCurrentPage(value))
        dispatch(getCardsTC())
    }

    const handleChangePortionSize = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCount(Number(event.target.value)))
        dispatch(getCardsTC())
    }

    const handleCreateCard = () => {
        const newCard: ICreateCardData = {
            cardsPack_id: String(packId),
            question: 'question',
            answer: 'answer'
        }

        dispatch(createCardTC(newCard))
    }

    const handleSearchCard = useDebouncedCallback((value: string) => {
        dispatch(setIsEmptyCardQuestionSearchValue(true))
        dispatch(setCardQuestionSearch(value))
        dispatch(getCardsTC())
    }, 600)


    return <div className={styles.container}>
        {isMyPack ? <MyCards
                packName={String(packName)}
                cards={cards}
                handleCreateCard={handleCreateCard}
                handleSearchCard={handleSearchCard}
                isEmptyCardQuestionSearchValue={isEmptyCardQuestionSearchValue}
                isMyPack={isMyPack}
                page={page}
                pageCount={pageCount}
                cardsTotalCount={cardsTotalCount}
                handleChangeCurrentPage={handleChangeCurrentPage}
                handleChangePortionSize={handleChangePortionSize}
            /> :
            <FriendCards packName={String(packName)}
                         cards={cards}
                         handleSearchCard={handleSearchCard}
                         isEmptyCardQuestionSearchValue={isEmptyCardQuestionSearchValue}
                         isMyPack={isMyPack}
                         page={page}
                         pageCount={pageCount}
                         cardsTotalCount={cardsTotalCount}
                         handleChangeCurrentPage={handleChangeCurrentPage}
                         handleChangePortionSize={handleChangePortionSize}
            />}
    </div>
}
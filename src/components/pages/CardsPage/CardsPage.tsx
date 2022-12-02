import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getCardsTC} from "../../../store/reducers/card/card.actions";
import styles from './CardsPage.module.scss';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {SelectChangeEvent} from "@mui/material/Select";
import {
    setCardQuestionSearch,
    setCardsCurrentPage,
    setCardsPageCount, setIsEmptyCardQuestionSearchValue,
    setOpenedPackId
} from "../../../store/reducers/card/card.slice";
import {useDebouncedCallback} from "use-debounce";
import {MyCards} from "../../screens/MyCards/MyCards";
import {FriendCards} from "../../screens/FriendCards/FriendCards";
import {
    setCurrentContentModal,
    setCurrentPackData,
    setIsOpenModal,
    setModalTitle
} from "../../../store/reducers/modal/modal.slice";
import {AddCardModalForm} from "../../ui/modal/ModalContent/CardModals/AddCardModalForm";

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
        dispatch(setModalTitle('Add new card'))
        dispatch(setCurrentContentModal(AddCardModalForm))
        dispatch(setIsOpenModal(true))
        dispatch(setCurrentPackData({_id: String(packId), name: String(packName)}))
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
                packId={String(packId)}
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
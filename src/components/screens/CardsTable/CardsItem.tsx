import React, {FC} from "react";
import {ICard} from "../../../types/cards";
import styles from './CardsTable.module.scss';
import {getCorrectDate} from "../../../utils/date";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {MyRating} from "../../ui/rating/Rating";
import {
    setCurrentCardData,
    setCurrentContentModal,
    setIsOpenModal,
    setModalTitle
} from "../../../store/reducers/modal/modal.slice";
import {UpdateCardModalForm} from "../../ui/modal/ModalContent/CardModals/UpdateCardModalForm";
import {DeleteCardModalForm} from "../../ui/modal/ModalContent/CardModals/DeleteCardModalForm";

interface ICardItemProps {
    card: ICard
    isMyPack: boolean
}

export const CardsItem: FC<ICardItemProps> = ({card, isMyPack}) => {
    const dispatch = useAppDispatch()

    const handleUpdateCard = () => {
        dispatch(setModalTitle('Edit card'))
        dispatch(setCurrentContentModal(UpdateCardModalForm))
        dispatch(setCurrentCardData({_id: card._id, answer: card.answer, question: card.question}))
        dispatch(setIsOpenModal(true))
    }

    const handleDeleteCard = () => {
        dispatch(setModalTitle('Delete card'))
        dispatch(setCurrentContentModal(DeleteCardModalForm))
        dispatch(setCurrentCardData({_id: card._id, answer: card.answer, question: card.question}))
        dispatch(setIsOpenModal(true))
    }

    return <div className={`${isMyPack ? styles.myCard : styles.card}`}>
        <span>{card.question}</span>
        <span>{card.answer}</span>
        <span>{getCorrectDate(card.updated)}</span>
        <span><MyRating grade={card.grade}/></span>
        {isMyPack && <div className={styles.iconsBox}>
            <BorderColorIcon fontSize={'small'} onClick={handleUpdateCard}/>
            <DeleteOutlineIcon fontSize={'small'} onClick={handleDeleteCard}/>
        </div>}
    </div>
}
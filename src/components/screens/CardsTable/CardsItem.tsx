import React, {FC} from "react";
import {ICard, IUpdateCardData} from "../../../types/cards";
import styles from './CardsTable.module.scss';
import {getCorrectDate} from "../../../utils/date";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {deleteCardTC, updateCardTC} from "../../../store/reducers/card/card.actions";
import {MyRating} from "../../ui/rating/Rating";
import {useAppSelector} from "../../../hooks/useAppSelector";

interface ICardItemProps {
    card: ICard
    isMyPack: boolean
}

export const CardsItem: FC<ICardItemProps> = ({card, isMyPack}) => {
    const dispatch = useAppDispatch()

    const handleUpdateCard = () => {
        const updateData: IUpdateCardData = {
            _id: card._id,
            question: 'updated question'
        }

        dispatch(updateCardTC(updateData))
    }


    const handleDeleteCard = () => {
        dispatch(deleteCardTC({cardId: card._id}))
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
import React, {FC} from "react";
import {ICard} from "../../../types/cards";
import styles from './CardsTable.module.scss';
import {getCorrectDate} from "../../../utils/date";

interface ICardItemProps {
    card: ICard
}

export const CardsItem: FC<ICardItemProps> = ({card}) => {
    return <div className={styles.card}>
        <span>{card.question}</span>
        <span>{card.answer}</span>
        <span>{getCorrectDate(card.updated)}</span>
        <span>{card.grade}</span>
    </div>
}
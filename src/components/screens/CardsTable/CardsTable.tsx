import React, {FC} from "react";
import styles from './CardsTable.module.scss'
import {useAppSelector} from "../../../hooks/useAppSelector";
import {CardsItem} from "./CardsItem";

export const CardsTable: FC = () => {
    const cards = useAppSelector(state => state.card.cards)

    return <div className={styles.cardsTable}>
        <div className={styles.titles}>
            <span>Question</span>
            <span>Answer</span>
            <span>Last Updated</span>
            <span>Grade</span>
        </div>
        <div className={styles.cards}>
            {cards.map(card => <CardsItem card={card} key={card._id}/>)}
        </div>
    </div>
}
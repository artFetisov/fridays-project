import React, {FC} from "react";
import styles from './CardsTable.module.scss'
import {CardsItem} from "./CardsItem";
import {ICard} from "../../../types/cards";

interface ICardsTableProps {
    isMyPack: boolean
    cards: ICard[]
}

export const CardsTable: FC<ICardsTableProps> = ({isMyPack, cards}) => {

    return <div className={styles.cardsTable}>
        {!isMyPack && <>
            <div className={styles.titles}>
                <span>Question</span>
                <span>Answer</span>
                <span>Last Updated</span>
                <span>Grade</span>
            </div>
        </>}

        {isMyPack && <>
            <div className={styles.myTitles}>
                <span>Question</span>
                <span>Answer</span>
                <span>Last Updated</span>
                <span>Grade</span>
                <span></span>
            </div>

        </>}


        <div className={`${isMyPack ? styles.myCards : styles.cards}`}>
            {cards.map(card => <CardsItem card={card} key={card._id} isMyPack={isMyPack}/>)}
        </div>

    </div>
}
import React, {FC} from "react";
import styles from './CardsTable.module.scss'
import {CardsItem} from "./CardsItem";
import {ICard} from "../../../types/cards";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setSortCardsValue} from "../../../store/reducers/card/card.slice";
import {getCardsTC} from "../../../store/reducers/card/card.actions";

interface ICardsTableProps {
    isMyPack: boolean
    cards: ICard[]
}

export const CardsTable: FC<ICardsTableProps> = ({isMyPack, cards}) => {
    const dispatch = useAppDispatch()
    const sortCardsValue = useAppSelector(state => state.card.sortCardsValue)

    const handleChangeSortCardsValue = () => {
        dispatch(setSortCardsValue(sortCardsValue === '0updated' ? '1updated' : '0updated'))
        dispatch(getCardsTC())
    }

    if (!cards.length) {
        return <></>
    }

    return <div className={styles.cardsTable}>
        {!isMyPack && <>
            <div className={styles.titles}>
                <span>Question</span>
                <span>Answer</span>
                <span className={styles.iconsBox}>Last Updated {sortCardsValue === '0updated'
                    ? <ArrowDropDownIcon onClick={handleChangeSortCardsValue} cursor={'pointer'}/>
                    : <ArrowDropUpIcon onClick={handleChangeSortCardsValue} cursor={'pointer'}/>}
                </span>
                <span>Grade</span>
            </div>
        </>}

        {isMyPack && <>
            <div className={styles.myTitles}>
                <span>Question</span>
                <span>Answer</span>
                <span className={styles.iconsBox}>Last Updated {sortCardsValue === '0updated'
                    ? <ArrowDropDownIcon onClick={handleChangeSortCardsValue} cursor={'pointer'}/>
                    : <ArrowDropUpIcon onClick={handleChangeSortCardsValue} cursor={'pointer'}/>}
                </span>
                <span>Grade</span>
                <span></span>
            </div>

        </>}


        <div className={`${isMyPack ? styles.myCards : styles.cards}`}>
            {cards.map(card => <CardsItem card={card} key={card._id} isMyPack={isMyPack}/>)}
        </div>

    </div>
}
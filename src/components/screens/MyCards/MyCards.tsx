import React, {FC} from "react";
import {PATH} from "../../../routes/router.data";
import styles from './MyCards.module.scss';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Link} from "react-router-dom";
import {Button} from "../../ui/button/Button";
import {ICard} from "../../../types/cards";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {CardsTable} from "../CardsTable/CardsTable";
import {Paginator} from "../../ui/pagination/Paginator";
import {SelectChangeEvent} from "@mui/material/Select";
import {ButtonTooltip} from "../../ui/button-tooltip/ButtonTooltip";

interface IMyCardsProps {
    packName: string
    cards: ICard[]
    handleCreateCard: () => void
    handleSearchCard: (value: string) => void
    isEmptyCardQuestionSearchValue: boolean
    isMyPack: boolean
    page: number
    pageCount: number
    cardsTotalCount: number
    handleChangeCurrentPage: (event: React.ChangeEvent<unknown>, value: number) => void
    handleChangePortionSize: (event: SelectChangeEvent) => void
}

export const MyCards: FC<IMyCardsProps> =
    ({
         packName,
         cards,
         handleCreateCard,
         handleSearchCard,
         isMyPack,
         isEmptyCardQuestionSearchValue,
         page,
         pageCount,
         cardsTotalCount,
         handleChangeCurrentPage,
         handleChangePortionSize
     }) => {

        return <>
            <Link to={PATH.PACKS}>
                <div className={styles.backArrowWrapper}>
                    <KeyboardBackspaceIcon/>
                    <span>Back to Packs List</span>
                </div>
            </Link>

            <div className={styles.titleAndButtonBox}>
                <h3 className={styles.title}>{packName}</h3>
                <ButtonTooltip/>
                {cards.length > 0 && <Button onClick={handleCreateCard}>Add new Card</Button>}
            </div>

            {(cards.length > 0 || isEmptyCardQuestionSearchValue) && <>
                <div className={styles.searchTitle}>Search</div>
                <MySearchInput fullWidth handleSearch={handleSearchCard}/>
            </>}


            {cards.length > 0 && <CardsTable isMyPack={isMyPack} cards={cards}/>}
            {(cards.length === 0 && isEmptyCardQuestionSearchValue) &&
                <div className={styles.notFound}>There are no cards matching the search in this pack</div>}

            {cards.length > 0 && <>
                <Paginator page={page} pageCount={pageCount}
                           totalCount={cardsTotalCount}
                           handleChangeCurrentPage={handleChangeCurrentPage}
                           handleChangePortionSize={handleChangePortionSize}/>
            </>}


            {(cards.length === 0 && !isEmptyCardQuestionSearchValue) && <div>
                <div className={styles.isEmpty}>This pack is empty.Click add new card to fill this pack</div>
                <div style={{textAlign: 'center'}}>
                    <Button onClick={handleCreateCard}>Add new card</Button>
                </div>
            </div>}
        </>
    }
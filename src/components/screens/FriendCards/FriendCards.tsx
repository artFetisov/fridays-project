import React, {FC} from "react";
import {PATH} from "../../../routes/router.data";
import styles from './FriendCards.module.scss';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Link} from "react-router-dom";
import {Button} from "../../ui/button/Button";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {CardsTable} from "../CardsTable/CardsTable";
import {Paginator} from "../../ui/pagination/Paginator";
import {ICard} from "../../../types/cards";
import {SelectChangeEvent} from "@mui/material/Select";

interface IFriendCards {
    packName: string
    cards: ICard[]
    isEmptyCardQuestionSearchValue: boolean
    isMyPack: boolean
    page: number
    pageCount: number
    cardsTotalCount: number
    handleChangeCurrentPage: (event: React.ChangeEvent<unknown>, value: number) => void
    handleChangePortionSize: (event: SelectChangeEvent) => void
    handleSearchCard: (value: string) => void
}

export const FriendCards: FC<IFriendCards> = (
    {
        packName,
        cards,
        isEmptyCardQuestionSearchValue,
        isMyPack,
        page,
        pageCount,
        cardsTotalCount,
        handleChangeCurrentPage,
        handleChangePortionSize,
        handleSearchCard
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
            {<Button>Learn to pack</Button>}
        </div>

        <div className={styles.searchTitle}>Search</div>
        <MySearchInput fullWidth handleSearch={handleSearchCard}/>

        {cards.length > 0 && <CardsTable isMyPack={isMyPack} cards={cards}/>}
        {cards.length <= 0 &&
            <div className={styles.notFound}>There are no cards matching the search in this pack</div>}

        {cards.length > 0 && <Paginator page={page} pageCount={pageCount}
                                        totalCount={cardsTotalCount}
                                        handleChangeCurrentPage={handleChangeCurrentPage}
                                        handleChangePortionSize={handleChangePortionSize}/>}
    </>
}
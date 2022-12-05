import React, {FC} from "react";
import styles from './FriendCards.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../ui/button/Button";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {CardsTable} from "../CardsTable/CardsTable";
import {Paginator} from "../../ui/pagination/Paginator";
import {ICard} from "../../../types/cards";
import {SelectChangeEvent} from "@mui/material/Select";
import {BackArrow} from "../../ui/back-arrow/BackArrow";

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
        isMyPack,
        page,
        pageCount,
        cardsTotalCount,
        handleChangeCurrentPage,
        handleChangePortionSize,
        handleSearchCard
    }) => {
    const navigate = useNavigate()
    const {packId} = useParams()

    const redirect = () => {
        navigate(`/learn-pack/${packId}`)
    }

    return <>
        <BackArrow/>
        <div className={styles.titleAndButtonBox}>
            <h3 className={styles.title}>{packName}</h3>
            {<Button onClick={redirect}>Learn to pack</Button>}
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
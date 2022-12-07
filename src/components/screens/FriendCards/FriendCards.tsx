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
import cn from 'classnames';
import {useAppSelector} from "../../../hooks/useAppSelector";

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
    const appStatus = useAppSelector(state => state.app.appStatus)

    const navigate = useNavigate()
    const {packId} = useParams()

    const redirect = () => {
        navigate(`/learn-pack/${packId}`)
    }

    return <>
        <BackArrow/>
        <div className={styles.titleAndButtonBox}>
            <h3 className={cn(styles.title, {
                [styles.disabled]: appStatus === 'loading'
            })}>{packName}</h3>
            {<Button onClick={redirect} disabled={appStatus === 'loading'}>Learn to pack</Button>}
        </div>
        <div className={cn(styles.searchTitle, {
            [styles.disabled]: appStatus === 'loading'
        })}>Search
        </div>
        <MySearchInput disabled={appStatus === 'loading'} fullWidth handleSearch={handleSearchCard}/>
        <CardsTable isMyPack={isMyPack} cards={cards}/>
        {cards.length <= 0 &&
            <div className={styles.notFound}>There are no cards matching the search in this pack</div>}
        {cards.length > 0 && <Paginator page={page} pageCount={pageCount}
                                        totalCount={cardsTotalCount}
                                        handleChangeCurrentPage={handleChangeCurrentPage}
                                        handleChangePortionSize={handleChangePortionSize}/>}
    </>
}
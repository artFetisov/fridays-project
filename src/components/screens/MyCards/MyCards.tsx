import React, {FC} from "react";
import styles from './MyCards.module.scss';
import {Button} from "../../ui/button/Button";
import {ICard} from "../../../types/cards";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {CardsTable} from "../CardsTable/CardsTable";
import {Paginator} from "../../ui/pagination/Paginator";
import {SelectChangeEvent} from "@mui/material/Select";
import {ButtonTooltip} from "../../ui/button-tooltip/ButtonTooltip";
import {BackArrow} from "../../ui/back-arrow/BackArrow";
import {useAppSelector} from "../../../hooks/useAppSelector";
import cn from 'classnames';
import {Avatar} from "@mui/material";

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
    packId: string
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
         handleChangePortionSize,
     }) => {
        const appStatus = useAppSelector(state => state.app.appStatus)

        const isLoading = appStatus === 'loading'

        const packDeckCover = useAppSelector(state => state.card.packDeckCover)


        return <>
            <BackArrow/>
            <div className={styles.titleAndButtonBox}>
                <h3 className={cn(styles.title, {
                    [styles.disabled]: isLoading
                })}>{packName}</h3>
                <ButtonTooltip/>
                {cards.length > 0 && <Button disabled={isLoading} onClick={handleCreateCard}>Add new Card</Button>}
            </div>

            <Avatar
                sx={{width: 220, height: 140, marginTop: 2, marginBottom: 4}}
                src={packDeckCover}
                variant="rounded">
                {!packDeckCover && 'no cover'}
            </Avatar>

            {(cards.length > 0 || isEmptyCardQuestionSearchValue) && <>
                <div className={cn(styles.searchTitle, {
                    [styles.disabled]: isLoading
                })}>Search
                </div>
                <MySearchInput disabled={isLoading} fullWidth handleSearch={handleSearchCard}/>
            </>}

            <CardsTable isMyPack={isMyPack} cards={cards}/>
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
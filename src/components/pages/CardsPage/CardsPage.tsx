import React, {FC, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createCardTC, getCardsTC} from "../../../store/reducers/card/card.actions";
import {PATH} from "../../../routes/router.data";
import styles from './CardsPage.module.scss';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Button} from "../../ui/button/Button";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {CardsTable} from "../../screens/CardsTable/CardsTable";
import {Paginator} from "../../ui/pagination/Paginator";
import {SelectChangeEvent} from "@mui/material/Select";
import {setCardsCurrentPage, setCardsPageCount, setOpenedPackId} from "../../../store/reducers/card/card.slice";
import {ICreateCardData} from "../../../types/cards";

export const CardsPage: FC = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams()
    const myId = useAppSelector(state => state.user.user?._id)
    const cards = useAppSelector(state => state.card.cards)
    const packName = useAppSelector(state => state.card.packName)
    const page = useAppSelector(state => state.card.page)
    const pageCount = useAppSelector(state => state.card.pageCount)
    const cardsTotalCount = useAppSelector(state => state.card.cardsTotalCount)
    const packUserId = useAppSelector(state => state.card.packUserId)

    const isMyPack = myId === packUserId

    useEffect(() => {
        if (packId) {
            dispatch(setOpenedPackId(packId))
            dispatch(getCardsTC())
        }
    }, [packId])

    const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsCurrentPage(value))
        dispatch(getCardsTC())
    }

    const handleChangePortionSize = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCount(Number(event.target.value)))
        dispatch(getCardsTC())
    }

    const handleCreateCard = () => {
        const newCard: ICreateCardData = {
            cardsPack_id: String(packId),
            question: 'question',
            answer: 'answer'
        }

        dispatch(createCardTC(newCard))
    }

    return <div className={styles.container}>
        <Link to={PATH.PACKS}>
            <div className={styles.backArrowWrapper}>
                <KeyboardBackspaceIcon/>
                <span>Back to Packs List</span>
            </div>
        </Link>

        <div className={styles.titleAndButtonBox}>
            <h3 className={styles.title}>{packName}</h3>
            {cards.length > 0 && !isMyPack && <Button>Learn to pack</Button>}
            {cards.length > 0 && isMyPack && <Button onClick={handleCreateCard}>Add new Card</Button>}
        </div>
        {cards.length ? <>
                <div className={styles.searchTitle}>Search</div>
                <MySearchInput fullWidth/>
                <CardsTable isMyPack={isMyPack}/>
                <Paginator page={page} pageCount={pageCount}
                           totalCount={cardsTotalCount}
                           handleChangeCurrentPage={handleChangeCurrentPage}
                           handleChangePortionSize={handleChangePortionSize}/>
            </>
            : <div>
                {!isMyPack && <div className={styles.isEmpty}>This pack is empty.</div>}
                {isMyPack && <div>
                    <div className={styles.isEmpty}>This pack is empty.Click add new card to fill this pack</div>
                    <div style={{textAlign: 'center'}}>
                        <Button onClick={handleCreateCard}>Add new card</Button>
                    </div>
                </div>}
            </div>
        }
    </div>
}
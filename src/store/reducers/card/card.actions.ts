import {createAsyncThunk} from "@reduxjs/toolkit";
import {cardService} from "../../../services/cardService";
import {ICardsRequestParams} from "../../../types/cards";
import {setCards, setCardsPackName, setCardSTotalCount, setPackUserId} from "./card.slice";
import {AppRootState} from "../../index";

export const getCardsTC = createAsyncThunk<void, void, { state: AppRootState }>('card/getAll', async (_, {
    dispatch,
    getState
}) => {
    try {
        const {page, pageCount, openedPackId, cardsTotalCount} = getState().card

        const cardsParams: ICardsRequestParams = {
            cardsPack_id: openedPackId as string,
            page,
            pageCount
        }

        const response = await cardService.getAll(cardsParams)

        if (cardsTotalCount === 0) {
            dispatch(setCardSTotalCount(response.cardsTotalCount))
        }

        dispatch(setPackUserId(response.packUserId))
        dispatch(setCardsPackName(response.packName))
        dispatch(setCards(response.cards))
    } catch (error) {
        alert(error)
    }
})
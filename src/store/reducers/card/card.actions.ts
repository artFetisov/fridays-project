import {createAsyncThunk} from "@reduxjs/toolkit";
import {cardService} from "../../../services/cardService";
import {ICardsRequestParams, ICreateCardData, IUpdateCardData} from "../../../types/cards";
import {setCards, setCardsPackName, setCardSTotalCount, setPackUserId} from "./card.slice";
import {AppRootState} from "../../index";

export const getCardsTC = createAsyncThunk<void, void, { state: AppRootState }>('card/getAll', async (_, {
    dispatch,
    getState
}) => {
    try {
        const {page, pageCount, openedPackId, cardQuestionSearch} = getState().card

        const cardsParams: ICardsRequestParams = {
            cardsPack_id: openedPackId as string,
            page,
            pageCount,
            cardQuestion: cardQuestionSearch
        }

        const response = await cardService.getAll(cardsParams)

        dispatch(setCardSTotalCount(response.cardsTotalCount))

        dispatch(setPackUserId(response.packUserId))
        dispatch(setCardsPackName(response.packName))
        dispatch(setCards(response.cards))
    } catch (error) {
        alert(error)
    }
})

export const createCardTC = createAsyncThunk<void, ICreateCardData, { state: AppRootState }>('card/create',
    async (cardData, {dispatch}) => {
        try {
            await cardService.createCard(cardData)
            dispatch(getCardsTC())
        } catch (error) {
            alert(error)
        }
    })

export const updateCardTC = createAsyncThunk<void, IUpdateCardData, { state: AppRootState }>('card/update',
    async (cardData, {dispatch}) => {
        try {
            await cardService.updateCard(cardData)
            dispatch(getCardsTC())
        } catch (error) {
            alert(error)
        }
    })

export const deleteCardTC = createAsyncThunk<void, { cardId: string }, { state: AppRootState }>('card/delete',
    async ({cardId}, {dispatch}) => {
        try {
            await cardService.deleteCard(cardId)
            dispatch(getCardsTC())
        } catch (error) {
            alert(error)
        }
    })
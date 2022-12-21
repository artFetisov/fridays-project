import { createAsyncThunk } from '@reduxjs/toolkit'

import { cardService } from '../../../services/cardService'
import {
  ICardsRequestParams,
  ICreateCardData,
  ISendGradeCardRequestData,
  IUpdateCardData,
} from '../../../types/cards'
import { errorToastr, successToastr } from '../../../utils/toastr'
import { AppRootState } from '../../index'
import { setAppStatus } from '../app/app.slice'

import {
  setCards,
  setCardsPackName,
  setCardSTotalCount,
  setPackDeckCover,
  setPackUserId,
} from './card.slice'

export const getCardsTC = createAsyncThunk<void, void, { state: AppRootState }>(
  'card/getAll',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setAppStatus('loading'))

      const { page, pageCount, openedPackId, cardQuestionSearch, sortCardsValue } = getState().card

      const cardsParams: ICardsRequestParams = {
        cardsPack_id: openedPackId as string,
        page,
        pageCount,
        cardQuestion: cardQuestionSearch,
        sortCards: sortCardsValue,
      }

      const response = await cardService.getAll(cardsParams)

      dispatch(setCardSTotalCount(response.cardsTotalCount))

      dispatch(setPackUserId(response.packUserId))
      dispatch(setCardsPackName(response.packName))
      dispatch(setPackDeckCover(response.packDeckCover))
      dispatch(setCards(response.cards))

      dispatch(setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Getting cards', dispatch, setAppStatus('failed'))
    }
  }
)

export const createCardTC = createAsyncThunk<void, ICreateCardData, { state: AppRootState }>(
  'card/create',
  async (cardData, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await cardService.createCard(cardData)
      await dispatch(getCardsTC())
      successToastr('Create card', 'add was successful', dispatch, setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Create card', dispatch, setAppStatus('failed'))
    }
  }
)

export const updateCardTC = createAsyncThunk<void, IUpdateCardData, { state: AppRootState }>(
  'card/update',
  async (cardData, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await cardService.updateCard(cardData)
      await dispatch(getCardsTC())
      successToastr('Update card', 'update was successful', dispatch, setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Update card', dispatch, setAppStatus('failed'))
    }
  }
)

export const deleteCardTC = createAsyncThunk<void, { cardId: string }, { state: AppRootState }>(
  'card/delete',
  async ({ cardId }, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await cardService.deleteCard(cardId)
      await dispatch(getCardsTC())
      successToastr('Delete card', 'delete was successful', dispatch, setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Delete card', dispatch, setAppStatus('failed'))
    }
  }
)

export const sendGradeCardTC = createAsyncThunk<void, ISendGradeCardRequestData>(
  'card/grade',
  async (data, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      await cardService.sendCardGrade(data)
      dispatch(setAppStatus('succeeded'))
    } catch (error) {
      errorToastr(error as Error, 'Sending grade', dispatch, setAppStatus('failed'))
    }
  }
)

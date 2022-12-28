import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICard, SortCardsType } from '../../../types/cards'

interface ICardState {
  cards: ICard[]
  packName: string | null
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string | null
  openedPackId: string | null
  cardQuestionSearch: string
  isEmptyCardQuestionSearchValue: boolean
  sortCardsValue: SortCardsType
  packDeckCover: string
}

const initialState: ICardState = {
  cards: [],
  packName: null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 10,
  packUserId: null,
  openedPackId: null,
  cardQuestionSearch: '',
  isEmptyCardQuestionSearchValue: false,
  sortCardsValue: '0updated',
  packDeckCover: '',
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload
    },
    setOpenedPackId(state, action: PayloadAction<string>) {
      state.openedPackId = action.payload
    },
    setCardSTotalCount(state, action: PayloadAction<number>) {
      state.cardsTotalCount = action.payload
    },
    setCardsPackName(state, action: PayloadAction<string>) {
      state.packName = action.payload
    },
    setCardsCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setCardsPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    setPackUserId(state, action: PayloadAction<string>) {
      state.packUserId = action.payload
    },
    setCardQuestionSearch(state, action: PayloadAction<string>) {
      state.cardQuestionSearch = action.payload
    },
    setIsEmptyCardQuestionSearchValue(state, action: PayloadAction<boolean>) {
      state.isEmptyCardQuestionSearchValue = action.payload
    },
    setSortCardsValue(state, action: PayloadAction<SortCardsType>) {
      state.sortCardsValue = action.payload
    },
    setPackDeckCover(state, action: PayloadAction<string>) {
      state.packDeckCover = action.payload
    },
    updateGradeCard(state, action: PayloadAction<{ card_id: string; grade: number }>) {
      const updatedCards = state.cards.map(card =>
        card._id === action.payload.card_id
          ? {
              ...card,
              grade: action.payload.grade,
            }
          : card
      )

      state.cards = updatedCards
    },
  },
})

export const {
  setCards,
  setCardsPackName,
  setCardsPageCount,
  setCardSTotalCount,
  setCardsCurrentPage,
  setOpenedPackId,
  setPackUserId,
  setCardQuestionSearch,
  setIsEmptyCardQuestionSearchValue,
  setSortCardsValue,
  updateGradeCard,
  setPackDeckCover,
} = cardSlice.actions

export const { reducer } = cardSlice

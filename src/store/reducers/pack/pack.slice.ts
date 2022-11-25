import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPack, IVariantMyOrAllPacks} from "../../../types/packs";
import {RequestStatusType} from "../../../types/auth";

interface IPackState {
    cardPacks: IPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    currentMinCardsCount: number
    currentMaxCardsCount: number
    page: number
    pageCount: number
    packStatus: RequestStatusType
    variantMyOrAllPacks: IVariantMyOrAllPacks

}

const initialState: IPackState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    currentMinCardsCount: 0,
    currentMaxCardsCount: 0,
    page: 1,
    pageCount: 10,
    packStatus: 'idle',
    variantMyOrAllPacks: 'all',

}

const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {
        setPacks(state, action: PayloadAction<IPack[]>) {
            state.cardPacks = action.payload
        },
        setPacksTotalCount(state, action: PayloadAction<number>) {
            state.cardPacksTotalCount = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setMinAndMaxCardsCount(state, action: PayloadAction<number[]>) {
            state.minCardsCount = action.payload[0]
            state.maxCardsCount = action.payload[1]
        },
        setMinAndMaxCurrentCardsCount(state, action: PayloadAction<number[]>) {
            state.currentMinCardsCount = action.payload[0]
            state.currentMaxCardsCount = action.payload[1]
        },
        setPacksStatus(state, action: PayloadAction<RequestStatusType>) {
            state.packStatus = action.payload
        },
        resetParams(state) {
            state.page = 1
            state.pageCount = 10
            state.currentMaxCardsCount = state.maxCardsCount
            state.currentMinCardsCount = state.minCardsCount
        },
        setVariantMyOrAllPacks(state, action: PayloadAction<IVariantMyOrAllPacks>) {
            state.variantMyOrAllPacks = action.payload
        }
    },
})


export const {
    setPacksTotalCount,
    setPacks,
    setCurrentPage,
    setPageCount,
    setMinAndMaxCardsCount,
    setPacksStatus,
    setMinAndMaxCurrentCardsCount,
    resetParams,
    setVariantMyOrAllPacks
} = packSlice.actions

export const {reducer} = packSlice
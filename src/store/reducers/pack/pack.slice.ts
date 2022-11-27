import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPack, IVariantMyOrAllPacks, SortPacksType} from "../../../types/packs";
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
    searchPackName: string
    sortPacks: SortPacksType
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
    searchPackName: '',
    sortPacks: '0updated'
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
        setSearchPackName(state, action: PayloadAction<string>) {
            state.searchPackName = action.payload
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
            state.searchPackName = ''
            state.variantMyOrAllPacks = 'all'
        },
        setVariantMyOrAllPacks(state, action: PayloadAction<IVariantMyOrAllPacks>) {
            state.variantMyOrAllPacks = action.payload
        },
        setSortPacks(state, action: PayloadAction<SortPacksType>) {
            state.sortPacks = action.payload
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
    setVariantMyOrAllPacks,
    setSearchPackName,
    setSortPacks
} = packSlice.actions

export const {reducer} = packSlice
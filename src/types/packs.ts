export interface IPack {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

export interface IAllPacksWithParams {
    cardPacks: IPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export interface IPackParams {
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export interface IPacksRequestParams {
    page: number
    pageCount: number
    min: number
    max: number
    user_id?: string
}

export interface ICreatePackData {
    name: string
    deckCover?: string
    private?: boolean
}

export interface IUpdatePackData {
    _id: string
    name: string
}

export type IVariantMyOrAllPacks = 'all' | 'my'
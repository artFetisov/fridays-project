export interface IPack {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
  deckCover: string
  private: boolean
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

export type SortPacksType = '1updated' | '0updated' | '1cardsCount' | '0cardsCount'

export interface IPacksRequestParams {
  page: number
  pageCount: number
  min: number
  max: number
  user_id?: string
  packName: string
  sortPacks: SortPacksType
}

export interface ICreatePackData {
  name: string
  deckCover?: string
  private?: boolean
}

export interface IUpdatePackData {
  _id: string
  name: string
  private?: boolean
  deckCover?: string
}

export type IVariantMyOrAllPacks = 'all' | 'my'

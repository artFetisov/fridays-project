export interface ICard {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export interface IAllCardsWithParams {
    cards: ICard[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
}

export interface ICardsRequestParams {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

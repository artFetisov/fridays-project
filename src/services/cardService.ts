import {instance} from "../api/axios";
import {
    IAllCardsWithParams,
    ICardsRequestParams,
    ICreateCardData,
    ISendGradeCardRequestData, ISendGradeCardResponseData,
    IUpdateCardData
} from "../types/cards";

export const cardService = {
    async getAll(params: ICardsRequestParams) {
        return instance.get<IAllCardsWithParams>('cards/card', {
            params: {
                ...params
            }
        }).then(data => data.data)
    },
    async createCard(cardData: ICreateCardData) {
        const data: { card: ICreateCardData } = {
            card: {
                ...cardData
            }
        }

        return instance.post('cards/card', data)
    },
    async updateCard(cardData: IUpdateCardData) {
        const data: { card: IUpdateCardData } = {
            card: {
                ...cardData
            }
        }

        return instance.put('cards/card', data)
    },
    async deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    async sendCardGrade(data: ISendGradeCardRequestData) {
        return instance.put<ISendGradeCardResponseData>('cards/grade', data).then(data => data.data)
    }
}
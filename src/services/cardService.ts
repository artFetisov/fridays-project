import {instance} from "../api/axios";
import {IAllCardsWithParams, ICardsRequestParams} from "../types/cards";

export const cardService = {
    async getAll(params: ICardsRequestParams) {
        return instance.get<IAllCardsWithParams>('cards/card', {
            params: {
                cardsPack_id: params.cardsPack_id,
                page: params.page,
                pageCount: params.pageCount
            }
        }).then(data => data.data)
    },
    async createCard() {
    },
    async updateCard() {
    },
    async deleteCard() {
    }
}
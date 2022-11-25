import {instance} from "../api/axios";
import {IAllPacksWithParams, ICreatePackData, IPacksRequestParams, IUpdatePackData} from "../types/packs";

export const packService = {
    async getAll(params: IPacksRequestParams) {
        return instance.get<IAllPacksWithParams>('cards/pack', {
                params: {
                    ...params
                }
            }
        ).then(data => data.data)
    },
    async createPack(packData: ICreatePackData) {
        const data: { cardsPack: ICreatePackData } = {
            cardsPack: {
                ...packData
            }
        }
        return instance.post('cards/pack', data).then(data => data.data)
    },
    async updatePack(packData: IUpdatePackData) {
        const data: { cardsPack: IUpdatePackData } = {
            cardsPack: {
                ...packData
            }
        }
        return instance.put('cards/pack', data).then(data => data.data)
    },
    async deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`).then(data => data.data)
    }
}
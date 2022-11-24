import {instance} from "../api/axios";
import {IAllPacksWithParams, ICreatePackData, IPacksRequestParams, IUpdatePackData} from "../types/packs";

export const packService = {
    async getAll(params: IPacksRequestParams) {
        return instance.get<IAllPacksWithParams>('cards/pack', {
                params: {
                    page: params.page,
                    pageCount: params.pageCount,
                    min: params.min,
                    max: params.max,
                    user_id: params.user_id
                }
            }
        ).then(data => data.data)
    },
    async createPack(packData: ICreatePackData) {
        const data = {
            cardsPack: {
                name: packData.name
            }
        }
        return instance.post('cards/pack', data)
    },
    async updatePack(packData: IUpdatePackData) {
        const data = {
            cardsPack: {
                name: packData.name,
                _id: packData._id
            }
        }
        return instance.put('cards/pack', data)
    },
    async deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    }
}
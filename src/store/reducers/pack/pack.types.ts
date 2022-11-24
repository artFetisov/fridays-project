import {IPack, IVariantMyOrAllPacks} from "../../../types/packs";
import {RequestStatusType} from "../../../types/auth";

export interface IPackState {
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
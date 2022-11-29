import {createAsyncThunk} from "@reduxjs/toolkit";
import {packService} from "../../../services/pack.service";
import {AppRootState} from "../../index";
import {
    setMinAndMaxCardsCount,
    setMinAndMaxCurrentCardsCount,
    setPacks,
    setPacksStatus,
    setPacksTotalCount
} from "./pack.slice";
import {ICreatePackData, IUpdatePackData} from "../../../types/packs";

export const getAllPacksTC = createAsyncThunk<void, void, { state: AppRootState }>('pack/getAll',
    async (_, {
        dispatch,
        getState
    }) => {
        try {
            const {
                maxCardsCount,
                minCardsCount,
                currentMinCardsCount,
                currentMaxCardsCount,
                pageCount,
                page,
                variantMyOrAllPacks,
                searchPackName,
                sortPacks
            } = getState().pack

            const userId = getState().user.user?._id

            dispatch(setPacksStatus('loading'))

            const response = await packService.getAll({
                max: currentMaxCardsCount,
                min: currentMinCardsCount,
                page,
                pageCount,
                user_id: variantMyOrAllPacks === 'my' ? userId : '',
                packName: searchPackName,
                sortPacks
            })

            dispatch(setPacksTotalCount(response.cardPacksTotalCount))

            if (maxCardsCount !== response.maxCardsCount || minCardsCount !== response.minCardsCount) {
                dispatch(setMinAndMaxCurrentCardsCount([response.minCardsCount, response.maxCardsCount]))
            }

            dispatch(setMinAndMaxCardsCount([response.minCardsCount, response.maxCardsCount]))
            dispatch(setPacks(response.cardPacks))
            dispatch(setPacksStatus('succeeded'))

        } catch (error) {
            alert(error)
            dispatch(setPacksStatus('failed'))
        }
    })

export const createPackTC = createAsyncThunk<void, ICreatePackData, { state: AppRootState }>('pack/create',
    async (cardsPack, {dispatch}) => {
        try {
            await packService.createPack(cardsPack)
            await dispatch(getAllPacksTC())
        } catch (error) {
            alert(error)
        }
    }
)

export const updatePackTC = createAsyncThunk<void, IUpdatePackData, { state: AppRootState }>('pack/update',
    async (cardsPack, {dispatch}) => {
        try {
            await packService.updatePack(cardsPack)
            await dispatch(getAllPacksTC())
        } catch (error) {
            alert(error)
        }
    }
)

export const deletePackTC = createAsyncThunk<void, { packId: string }, { state: AppRootState }>('pack/delete',
    async ({packId}, {dispatch}) => {
        try {
            await packService.deletePack(packId)
            await dispatch(getAllPacksTC())
        } catch (error) {
            alert(error)
        }
    })
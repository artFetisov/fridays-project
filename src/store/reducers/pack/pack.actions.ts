import {createAsyncThunk} from "@reduxjs/toolkit";
import {packService} from "../../../services/pack.service";
import {AppRootState} from "../../index";
import {
    setMinAndMaxCardsCount,
    setMinAndMaxCurrentCardsCount,
    setPacks,
    setPacksTotalCount
} from "./pack.slice";
import {ICreatePackData, IUpdatePackData} from "../../../types/packs";
import {errorToastr, successToastr} from "../../../utils/toastr";
import {setAppStatus} from "../app/app.slice";

export const getAllPacksTC = createAsyncThunk<void, void, { state: AppRootState }>('pack/getAll',
    async (_, {
        dispatch,
        getState,
    }) => {
        try {
            dispatch(setAppStatus('loading'))

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
            dispatch(setAppStatus('succeeded'))
        } catch (error) {
            errorToastr(error as Error, 'Getting card packs', dispatch, setAppStatus('failed'))
        }
    })

export const createPackTC = createAsyncThunk<void, ICreatePackData, { state: AppRootState }>('pack/create',
    async (cardsPack, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await packService.createPack(cardsPack)
            await dispatch(getAllPacksTC())
            successToastr('Create pack', 'add was successful', dispatch, setAppStatus('succeeded'))
        } catch (error) {
            errorToastr(error as Error, 'Create pack', dispatch, setAppStatus('failed'))
        }
    }
)

export const updatePackTC = createAsyncThunk<void, IUpdatePackData, { state: AppRootState }>('pack/update',
    async (cardsPack, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await packService.updatePack(cardsPack)
            await dispatch(getAllPacksTC())
            successToastr('Update pack', 'update was successful', dispatch, setAppStatus('succeeded'))
        } catch (error) {
            errorToastr(error as Error, 'Update pack', dispatch, setAppStatus('failed'))
        }
    }
)

export const deletePackTC = createAsyncThunk<void, { packId: string }, { state: AppRootState }>('pack/delete',
    async ({packId}, {dispatch}) => {
        try {
            dispatch(setAppStatus('loading'))
            await packService.deletePack(packId)
            await dispatch(getAllPacksTC())
            successToastr('Delete pack', 'delete was successful', dispatch, setAppStatus('succeeded'))
        } catch (error) {
            errorToastr(error as Error, 'Delete pack', dispatch, setAppStatus('failed'))
        }
    })
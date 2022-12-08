import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPacksRequestParams, IVariantMyOrAllPacks} from "../types/packs";
import {setAllParamsForRequestPacks} from "../store/reducers/pack/pack.slice";
import {useAppSelector} from "./useAppSelector";
import {useAppDispatch} from "./useAppDispatch";

export const useSynchronizationQueryParamsWithReduxState = () => {
    const dispatch = useAppDispatch()

    const {
        page,
        pageCount,
        currentMinCardsCount,
        currentMaxCardsCount,
        variantMyOrAllPacks,
        searchPackName,
        sortPacks
    } = useAppSelector(state => state.pack)


    const [searchParams, setSearchParams] = useSearchParams()
    const queryParamsObject = {} as IPacksRequestParams & { variant: IVariantMyOrAllPacks }

    searchParams.forEach((value, key) => {
        // @ts-ignore
        queryParamsObject[key] = value
    })

    const [firstRender, setFirstRender] = useState(true)

    const querySearchParamsObjFromRedux: IPacksRequestParams & { variant: IVariantMyOrAllPacks } = {
        page,
        pageCount,
        min: currentMinCardsCount,
        max: currentMaxCardsCount,
        packName: searchPackName,
        sortPacks,
        variant: variantMyOrAllPacks
    }

    const handleSetSearchParams = () => {
        // @ts-ignore
        setSearchParams(querySearchParamsObjFromRedux)
    }

    const handleSetAllParamsForRequestPacks = async () => {
        await dispatch(setAllParamsForRequestPacks(queryParamsObject))
    }

    useEffect(() => {
        if (Object.getOwnPropertyNames(queryParamsObject).length === 0 && !firstRender) {
            handleSetSearchParams()
        }
    }, [firstRender])


    useEffect(() => {
        if (!firstRender) {
            handleSetSearchParams()
        }

    }, [page, pageCount, currentMinCardsCount, currentMaxCardsCount, searchPackName, sortPacks, variantMyOrAllPacks, dispatch])


    return {
        firstRender,
        setFirstRender,
        queryParamsObject,
        setSearchParams,
        handleSetSearchParams,
        handleSetAllParamsForRequestPacks
    }
}
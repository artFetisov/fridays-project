import React, {FC, useEffect, useState} from "react";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import styles from './PacksPage.module.scss';
import {Button} from "../../ui/button/Button";
import {MySearchInput} from "../../ui/search-input/MySearchInput";
import {ButtonGroup} from "../../ui/button-group/ButtonGroup";
import {MyRangeSlider} from "../../ui/range-slider/MyRangeSlider";
import {PacksTable} from "../../screens/PacksTable/PacksTable";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Paginator} from "../../ui/pagination/Paginator";
import {
    setAllParamsForRequestPacks,
    setCurrentPage,
    setPageCount,
    setSearchPackName
} from "../../../store/reducers/pack/pack.slice";
import {SelectChangeEvent} from "@mui/material/Select";
import {useDebouncedCallback} from "use-debounce";
import {setCurrentContentModal, setIsOpenModal, setModalTitle} from "../../../store/reducers/modal/modal.slice";
import {AddPackModalForm} from "../../ui/modal/ModalContent/PackModals/AddPackModalForm";
import {useSearchParams} from "react-router-dom";
import {IPacksRequestParams, IVariantMyOrAllPacks} from "../../../types/packs";

export const PacksPage: FC = () => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.appStatus)
    const page = useAppSelector(state => state.pack.page)
    const pageCount = useAppSelector(state => state.pack.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const cardPacks = useAppSelector(state => state.pack.cardPacks)
    const currentMinCardsCount = useAppSelector(state => state.pack.currentMinCardsCount)
    const currentMaxCardsCount = useAppSelector(state => state.pack.currentMaxCardsCount)
    const packName = useAppSelector(state => state.pack.searchPackName)
    const sortPacksValue = useAppSelector(state => state.pack.sortPacks)
    const variant = useAppSelector(state => state.pack.variantMyOrAllPacks)

    const isLoading = appStatus === 'loading'

    const [searchParams, setSearchParams] = useSearchParams();

    const [firstRender, setFirstRender] = useState(true)

    const queryParamsObject = {} as IPacksRequestParams & { variant: IVariantMyOrAllPacks }

    searchParams.forEach((value, key) => {
        // @ts-ignore
        queryParamsObject[key] = value
    })

    const querySearchParamsObjFromRedux: IPacksRequestParams & { variant: IVariantMyOrAllPacks } = {
        page,
        pageCount,
        min: currentMinCardsCount,
        max: currentMaxCardsCount,
        packName,
        sortPacks: sortPacksValue,
        variant
    }

    const handleSetSearchParams = () => {
        console.log(querySearchParamsObjFromRedux)
        console.log('2')
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

    }, [page, pageCount, currentMinCardsCount, currentMaxCardsCount, packName, sortPacksValue, variant, dispatch])


    useEffect(() => {
        const fetchPacks = async () => {
            if (Object.getOwnPropertyNames(queryParamsObject).length > 0 && firstRender) {
                await handleSetAllParamsForRequestPacks()
            }

            await dispatch(getAllPacksTC())
            setFirstRender(false)
        }

        fetchPacks()

    }, [])

    const handleCreatePack = () => {
        dispatch(setModalTitle('Add new pack'))
        dispatch(setCurrentContentModal(AddPackModalForm))
        dispatch(setIsOpenModal(true))
    }

    const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
        dispatch(getAllPacksTC())
    }

    const handleChangePortionSize = (event: SelectChangeEvent) => {
        dispatch(setPageCount(Number(event.target.value)))
        dispatch(getAllPacksTC())
    }

    const handleSearchPackName = useDebouncedCallback((value: string) => {
        dispatch(setSearchPackName(value))
        dispatch(getAllPacksTC())
    }, 600)

    return <div className={styles.packsContainer}>
        <div className={styles.topBox}>
            <h3 className={styles.title}>Packs list</h3>
            <Button disabled={isLoading} onClick={handleCreatePack}>Add new pack</Button>
        </div>
        <div className={styles.paramsBox}>
            <span>Search</span>
            <span>Show packs cards</span>
            <span>Number of cards</span>
        </div>
        <div className={styles.paramsBox}>
            <MySearchInput disabled={isLoading} handleSearch={handleSearchPackName}/>
            <ButtonGroup/>
            <MyRangeSlider/>
        </div>
        <PacksTable/>
        {cardPacks.length > 0 && <Paginator
            totalCount={cardPacksTotalCount}
            page={page}
            pageCount={pageCount}
            handleChangeCurrentPage={handleChangeCurrentPage}
            handleChangePortionSize={handleChangePortionSize}
        />}
    </div>
}
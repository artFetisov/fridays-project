import React, {FC, useEffect} from "react";
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
import {useSynchronizationQueryParamsWithReduxState} from "../../../hooks/useSynchronizationQueryParamsWithReduxState";

export const PacksPage: FC = () => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.appStatus)
    const page = useAppSelector(state => state.pack.page)
    const pageCount = useAppSelector(state => state.pack.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const cardPacks = useAppSelector(state => state.pack.cardPacks)
    const packSearchName = useAppSelector(state => state.pack.searchPackName)

    const isLoading = appStatus === 'loading'

    const {
        firstRender,
        setFirstRender,
        queryParamsObject,
        handleSetAllParamsForRequestPacks
    } = useSynchronizationQueryParamsWithReduxState()

    useEffect(() => {
        const fetchPacks = async () => {
            if (Object.getOwnPropertyNames(queryParamsObject).length > 0 && firstRender) {
                await handleSetAllParamsForRequestPacks()
                await dispatch(getAllPacksTC({urlHasQueryParams: true}))
                setFirstRender(false)
                return
            }

            await dispatch(getAllPacksTC({}))
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
        dispatch(getAllPacksTC({}))
    }

    const handleChangePortionSize = (event: SelectChangeEvent) => {
        dispatch(setPageCount(Number(event.target.value)))
        dispatch(getAllPacksTC({}))
    }

    const handleSearchPackName = useDebouncedCallback((value: string) => {
        dispatch(setSearchPackName(value))
        dispatch(getAllPacksTC({}))
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
            <MySearchInput value={packSearchName} disabled={isLoading} handleSearch={handleSearchPackName}/>
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
import React, {FC} from "react";
import {IPack} from "../../../types/packs";
import styles from './PacksTable.module.scss';
import {getCorrectDate} from "../../../utils/date";
import {useAppSelector} from "../../../hooks/useAppSelector";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {IconButton, Skeleton} from "@mui/material";
import {
    setCurrentContentModal,
    setCurrentPackData,
    setIsOpenModal,
    setModalTitle
} from "../../../store/reducers/modal/modal.slice";
import {UpdatePackModalForm} from "../../ui/modal/ModalContent/PackModals/UpdatePackModalForm";
import {DeletePackModalForm} from "../../ui/modal/ModalContent/PackModals/DeletePackModalForm";

interface IPackProps {
    pack: IPack
}

export const PackItem: FC<IPackProps> = ({pack}) => {
    const dispatch = useAppDispatch()

    const myId = useAppSelector(state => state.user.user?._id)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    const navigate = useNavigate()

    const redirect = () => {
        return navigate(`/cards/${pack._id}`)
    }

    const handleUpdatePack = () => {
        dispatch(setModalTitle('Edit pack'))
        dispatch(setCurrentContentModal(UpdatePackModalForm))
        dispatch(setCurrentPackData({_id: pack._id, name: pack.name}))
        dispatch(setIsOpenModal(true))
    }

    const handleDeletePack = () => {
        dispatch(setModalTitle('Delete pack'))
        dispatch(setCurrentContentModal(DeletePackModalForm))
        dispatch(setCurrentPackData({_id: pack._id, name: pack.name}))
        dispatch(setIsOpenModal(true))
    }

    return <>
        {isLoading
            ? <Skeleton width={'100%'} variant={'rounded'} height={46} sx={{marginTop: 0.6}}/>
            : <div className={styles.pack}>
                <span>{pack.name}</span>
                <span>{pack.cardsCount}</span>
                <span>
            {getCorrectDate(pack.updated)}
            </span>
                <span className={styles.userName}>{pack.user_name}</span>
                <span>
            {pack.user_id === myId
                ? <div className={styles.iconsBox}>
                    <SchoolIcon color={'primary'} fontSize={'small'} aria-disabled={true} onClick={redirect}/>
                    <BorderColorIcon fontSize={'small'} onClick={handleUpdatePack}/>
                    <DeleteOutlineIcon fontSize={'small'} onClick={handleDeletePack}/>
                </div>
                : <div className={styles.iconsBox}>
                    <IconButton disabled={pack.cardsCount === 0} onClick={redirect}>
                        <SchoolIcon fontSize={'small'} aria-disabled={true}/>
                    </IconButton>
                </div>
            }
            </span>
            </div>
        }
    </>
}
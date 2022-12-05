import React, {FC} from "react";
import styles from './ButtonTooltip.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {
    setCurrentContentModal,
    setCurrentPackData,
    setIsOpenModal,
    setModalTitle
} from "../../../store/reducers/modal/modal.slice";
import {UpdatePackModalForm} from "../modal/ModalContent/PackModals/UpdatePackModalForm";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {DeletePackModalForm} from "../modal/ModalContent/PackModals/DeletePackModalForm";

export const EditTooltip: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {packId} = useParams()
    const packName = useAppSelector(state => state.card.packName)

    const handleUpdatePack = () => {
        dispatch(setModalTitle('Edit pack'))
        dispatch(setCurrentContentModal(UpdatePackModalForm))
        dispatch(setCurrentPackData({_id: packId as string, name: packName as string}))
        dispatch(setIsOpenModal(true))
    }

    const handleDeletePack = () => {
        dispatch(setModalTitle('Delete pack'))
        dispatch(setCurrentContentModal(DeletePackModalForm))
        dispatch(setCurrentPackData({_id: packId as string, name: packName as string}))
        dispatch(setIsOpenModal(true))
    }

    const redirect = () => {
        navigate(`/learn-pack/${packId}`)
    }


    return <div className={styles.headerTooltip}>
        <div className={styles.box} onClick={handleUpdatePack}>
            <div className={styles.iconBox}><BorderColorIcon fontSize={'small'}/></div>
            <span className={styles.text}>Edit</span>
        </div>
        <div className={styles.box} onClick={handleDeletePack}>
            <div className={styles.iconBox}><DeleteOutlineIcon fontSize={'small'}/></div>
            <span className={styles.text}>Delete</span>
        </div>
        <div className={styles.box} onClick={redirect}>
            <div className={styles.iconBox}><SchoolIcon fontSize={'small'}/></div>
            <span className={styles.text}>Learn</span>
        </div>
    </div>
}
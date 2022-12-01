import React from "react";
import styles from "./PackModals.module.scss";
import {Button} from "../../../button/Button";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {deletePackTC} from "../../../../../store/reducers/pack/pack.actions";

export const DeletePackModalForm = () => {
    const dispatch = useAppDispatch()

    const currentPackData = useAppSelector(state => state.modal.currentPackData)

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const handleDeletePack = () => {
        dispatch(deletePackTC({packId: currentPackData._id}))
        handleCloseModal()
    }

    return <>
        <div className={styles.question}>
            <div>Do you really want to remove <span className={styles.packName}>{currentPackData.name}</span>?</div>
            <div>All cards will be deleted.</div>
        </div>

        <div className={styles.buttonsBox}>
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button type={'submit'} variant={'red'} onClick={handleDeletePack}>Delete</Button>
        </div>
    </>
}
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import styles from "../PackModals/PackModals.module.scss";
import {Button} from "../../../button/Button";
import React from "react";
import {deleteCardTC} from "../../../../../store/reducers/card/card.actions";
import {Avatar} from "@mui/material";

export const DeleteCardModalForm = () => {
    const dispatch = useAppDispatch()

    const currentCardData = useAppSelector(state => state.modal.currentCardData)

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const handleDeletePack = () => {
        dispatch(deleteCardTC({cardId: currentCardData._id}))
        handleCloseModal()
    }

    return <>
        <div className={styles.question}>
            <div>Do you really want to remove card with
                question
                {(!currentCardData.answerImg || !currentCardData.questionImg)
                    ? <>
                    <span
                        className={styles.packName}> {currentCardData.question} </span>?
                    </>
                    : <>
                        ?
                        <Avatar
                            sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
                            src={currentCardData.questionImg as string}
                            variant="rounded"
                        /></>


                }
            </div>
        </div>

        <div className={styles.buttonsBox}>
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button type={'submit'} variant={'red'} onClick={handleDeletePack}>Delete</Button>
        </div>
    </>
}
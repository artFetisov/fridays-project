import styles from "./CardModals.module.scss";
import {Avatar, Button, TextField} from "@mui/material";
import {Button as MyButton} from "../../../button/Button";
import React, {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUpdateCardData} from "../../../../../types/cards";
import {updateCardTC} from "../../../../../store/reducers/card/card.actions";
import {toastr} from "react-redux-toastr";
import {getFileReaderURL} from "../../../../../utils/fileReader";

export const UpdateCardModalForm = () => {
    const dispatch = useAppDispatch()

    const [coverUrlQuestion, setCoverUrlQuestion] = useState<string | ArrayBuffer>('')
    const [coverUrlAnswer, setCoverUrlAnswer] = useState<string | ArrayBuffer>('')

    const currentCardData = useAppSelector(state => state.modal.currentCardData)

    const isPictureCard = currentCardData.questionImg || currentCardData.answerImg

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IUpdateCardData>()

    const onSubmitTextForm: SubmitHandler<IUpdateCardData> = (data) => {
        const updatedCard: IUpdateCardData = {
            ...data,
            _id: currentCardData._id
        }

        dispatch(updateCardTC(updatedCard))
        handleCloseModal()
    }

    const onSubmitPictureForm: SubmitHandler<IUpdateCardData> = () => {
        const updatedCardData: IUpdateCardData = {
            answerImg: coverUrlAnswer as string || currentCardData.answerImg,
            questionImg: coverUrlQuestion as string || currentCardData.questionImg,
            _id: currentCardData._id
        }

        dispatch(updateCardTC(updatedCardData))
        handleCloseModal()
    }

    const handleChangeCoverQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event?.target?.files[0]
            if (file.size > 1000000) {
                toastr.error('Error', 'File size is too large')
                return
            }

            getFileReaderURL(file, setCoverUrlQuestion)
        }
    }

    const handleChangeCoverAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event?.target?.files[0]
            if (file.size > 1000000) {
                toastr.error('Error', 'File size is too large')
                return
            }

            getFileReaderURL(file, setCoverUrlAnswer)
        }
    }

    return <>
        {!isPictureCard && <form className={styles.cardModal} onSubmit={handleSubmit(onSubmitTextForm)}>
            <TextField
                id="question"
                label="Question"
                error={!!errors.question}
                helperText={errors.question?.message || ''}
                variant="standard"
                fullWidth
                className={styles.input}
                {...register('question')}
                style={{marginBottom: '15px'}}
                defaultValue={currentCardData.question}
            />

            <TextField
                id="answer"
                label="Answer"
                error={!!errors.answer}
                helperText={errors.answer?.message || ''}
                variant="standard"
                fullWidth
                className={styles.input}
                {...register('answer')}
                style={{marginBottom: '15px'}}
                defaultValue={currentCardData.answer}
            />

            <div className={styles.buttonsBox}>
                <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</MyButton>
                <MyButton style={{padding: '8px 44px'}} type={'submit'}>Save</MyButton>
            </div>
        </form>}

        {isPictureCard && <form onSubmit={handleSubmit(onSubmitPictureForm)}>
            <div className={styles.titleAndButtonBox}>
                <span>Question</span>
                <Button variant="contained" component="label" size={'small'}>
                    Change cover
                    <input hidden accept="image/*"
                           multiple type="file"
                           onChange={handleChangeCoverQuestion}
                    />
                </Button>
            </div>

            <Avatar
                sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
                src={coverUrlQuestion as string || currentCardData.questionImg as string}
                variant="rounded">
                {(!currentCardData.questionImg && coverUrlQuestion) && 'no cover'}
            </Avatar>

            <div className={styles.titleAndButtonBox}>
                <span>Answer</span>
                <Button variant="contained" component="label" size={'small'}>
                    Change cover
                    <input hidden accept="image/*"
                           multiple type="file"
                           onChange={handleChangeCoverAnswer}
                    />
                </Button>
            </div>

            <Avatar
                sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
                src={coverUrlAnswer as string || currentCardData.answerImg as string}
                variant="rounded">
                {(!currentCardData.answerImg && !coverUrlAnswer) && 'no cover'}
            </Avatar>

            <div className={styles.buttonsBox}>
                <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</MyButton>
                <MyButton style={{padding: '8px 44px'}} type={'submit'}>Save</MyButton>
            </div>
        </form>}
    </>
}
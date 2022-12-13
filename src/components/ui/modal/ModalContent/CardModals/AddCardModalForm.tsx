import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {Avatar, Button, Select, TextField} from "@mui/material";
import {Button as MyButton} from "../../../button/Button";
import {ICreateCardData, VariantAddCardModalType} from "../../../../../types/cards";
import FormControl from "@mui/material/FormControl";
import {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from './CardModals.module.scss';
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {createCardTC} from "../../../../../store/reducers/card/card.actions";
import {toastr} from "react-redux-toastr";
import {getFileReaderURL} from "../../../../../utils/fileReader";

export const AddCardModalForm = () => {
    const dispatch = useAppDispatch()

    const currentPageData = useAppSelector(state => state.modal.currentPackData)

    const [variant, setVariant] = useState<VariantAddCardModalType>('Text')
    const [coverUrlQuestion, setCoverUrlQuestion] = useState<string | ArrayBuffer>('')
    const [coverUrlAnswer, setCoverUrlAnswer] = useState<string | ArrayBuffer>('')

    const handleChangeVariant = (event: SelectChangeEvent) => {
        setVariant(event.target.value as VariantAddCardModalType)
    }

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ICreateCardData>()

    const onSubmitTextForm: SubmitHandler<ICreateCardData> = (data) => {
        const newCard: ICreateCardData = {
            ...data,
            cardsPack_id: currentPageData._id
        }

        dispatch(createCardTC(newCard))
        handleCloseModal()
    }

    const onSubmitPictureForm: SubmitHandler<ICreateCardData> = () => {
        const newCard: ICreateCardData = {
            answerImg: coverUrlAnswer as string,
            questionImg: coverUrlQuestion as string,
            cardsPack_id: currentPageData._id
        }

        if (!coverUrlAnswer || !coverUrlQuestion) {
            toastr.error('Error', 'Сover for questions and answers are required')
            return
        }

        dispatch(createCardTC(newCard))
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

    return <div className={styles.cardModal}>
        <div className={styles.topText}>Choose a question format</div>

        <FormControl sx={{width: '100%', marginBottom: 2}}>
            <Select
                labelId="select-label"
                id="select-variant"
                value={variant}
                onChange={handleChangeVariant}
                size={'small'}
                fullWidth
            >
                <MenuItem value={'Text'}>Text</MenuItem>
                <MenuItem value={'Picture'}>Picture</MenuItem>
            </Select>
        </FormControl>

        {variant === 'Text' && <form onSubmit={handleSubmit(onSubmitTextForm)}>
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
            />

            <div className={styles.buttonsBox}>
                <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</MyButton>
                <MyButton style={{padding: '8px 44px'}} type={'submit'}>Save</MyButton>
            </div>
        </form>}


        {variant === 'Picture' && <form onSubmit={handleSubmit(onSubmitPictureForm)}>
            <div className={styles.titleAndButtonBox}>
                <span>Question</span>
                <Button variant="contained" component="label" size={'small'}>
                    Add cover
                    <input hidden accept="image/*"
                           multiple type="file"
                           onChange={handleChangeCoverQuestion}
                    />
                </Button>
            </div>

            <Avatar
                sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
                src={coverUrlQuestion as string}
                variant="rounded">
                {!coverUrlQuestion && 'no cover'}
            </Avatar>

            <div className={styles.titleAndButtonBox}>
                <span>Answer</span>
                <Button variant="contained" component="label" size={'small'}>
                    Add cover
                    <input hidden accept="image/*"
                           multiple type="file"
                           onChange={handleChangeCoverAnswer}
                    />
                </Button>
            </div>

            <Avatar
                sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
                src={coverUrlAnswer as string}
                variant="rounded">
                {!coverUrlAnswer && 'no cover'}
            </Avatar>

            <div className={styles.buttonsBox}>
                <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</MyButton>
                <MyButton style={{padding: '8px 44px'}} type={'submit'}>Save</MyButton>
            </div>
        </form>}

    </div>
}
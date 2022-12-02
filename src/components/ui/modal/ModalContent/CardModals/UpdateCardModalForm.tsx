import styles from "./CardModals.module.scss";
import FormControl from "@mui/material/FormControl";
import {Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "../../../button/Button";
import React, {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUpdateCardData} from "../../../../../types/cards";
import {updateCardTC} from "../../../../../store/reducers/card/card.actions";

export const UpdateCardModalForm = () => {
    const dispatch = useAppDispatch()

    const currentCardData = useAppSelector(state => state.modal.currentCardData)

    const [variant, setVariant] = useState('Text')

    const handleChangeVariant = (event: SelectChangeEvent) => {
        setVariant(event.target.value)
    }

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IUpdateCardData>()

    const onSubmit: SubmitHandler<IUpdateCardData> = (data) => {
        const updatedCard: IUpdateCardData = {
            ...data,
            _id: currentCardData._id
        }

        dispatch(updateCardTC(updatedCard))
        handleCloseModal()
    }

    return <form className={styles.cardModal} onSubmit={handleSubmit(onSubmit)}>
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
                <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
        </FormControl>

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
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button style={{padding: '8px 44px'}} type={'submit'}>Save</Button>
        </div>
    </form>
}
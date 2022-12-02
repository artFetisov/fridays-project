import React, {useState} from 'react'
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {Select, TextField} from "@mui/material";
import {Button} from "../../../button/Button";
import {ICreateCardData} from "../../../../../types/cards";
import FormControl from "@mui/material/FormControl";
import {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from './CardModals.module.scss';
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {createCardTC} from "../../../../../store/reducers/card/card.actions";

export const AddCardModalForm = () => {
    const [variant, setVariant] = useState('Text');

    const handleChange = (event: SelectChangeEvent) => {
        setVariant(event.target.value);
    };

    const dispatch = useAppDispatch()

    const currentPageData = useAppSelector(state => state.modal.currentPackData)

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ICreateCardData>()

    const onSubmit: SubmitHandler<ICreateCardData> = (data) => {
        const newCard: ICreateCardData = {
            ...data,
            cardsPack_id: currentPageData._id
        }

        dispatch(createCardTC(newCard))
        handleCloseModal()
    }

    return <form className={styles.cardModal} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topText}>Choose a question format</div>

        <FormControl sx={{width: '100%', marginBottom: 2}}>
            <Select
                labelId="select-label"
                id="select-variant"
                value={variant}
                onChange={handleChange}
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
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button style={{padding: '8px 44px'}} type={'submit'}>Save</Button>
        </div>
    </form>
}
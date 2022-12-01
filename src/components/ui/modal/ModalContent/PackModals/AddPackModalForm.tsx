import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICreatePackData} from "../../../../../types/packs";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {createPackTC} from "../../../../../store/reducers/pack/pack.actions";
import styles from './PackModals.module.scss';
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Button} from "../../../button/Button";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";

export const AddPackModalForm = () => {
    const dispatch = useAppDispatch()

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ICreatePackData>()

    const onSubmit: SubmitHandler<ICreatePackData> = (data) => {
        dispatch(createPackTC(data))
        handleCloseModal()
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            id="packName"
            label="Pack name"
            error={!!errors.name}
            helperText={errors.name?.message || ''}
            variant="standard"
            fullWidth
            className={styles.input}
            {...register('name')}
            style={{marginBottom: '15px'}}
        />

        <FormControlLabel className={styles.input} control={<Checkbox/>}
                          label="private"  {...register('private')}
                          style={{marginTop: '10px'}} id={'private'}/>

        <div className={styles.buttonsBox}>
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button style={{padding: '8px 44px'}} type={'submit'}>Save</Button>
        </div>
    </form>
}
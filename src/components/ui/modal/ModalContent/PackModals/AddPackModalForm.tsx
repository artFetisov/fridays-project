import React, {ChangeEvent, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICreatePackData} from "../../../../../types/packs";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {createPackTC} from "../../../../../store/reducers/pack/pack.actions";
import styles from './PackModals.module.scss';
import {Avatar, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Button as MyButton} from "../../../button/Button";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {getFileReaderURL} from "../../../../../utils/fileReader";

export const AddPackModalForm = () => {
    const dispatch = useAppDispatch()

    const [coverUrl, setCoverUrl] = useState<string | ArrayBuffer>('')

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ICreatePackData>()

    const onSubmit: SubmitHandler<ICreatePackData> = (data) => {
        const newPackData: ICreatePackData = {
            ...data,
            deckCover: coverUrl as string
        }

        dispatch(createPackTC(newPackData))
        handleCloseModal()
    }

    const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event?.target?.files[0]
            getFileReaderURL(file, setCoverUrl)
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <Button variant="contained" component="label">
            Add cover
            <input hidden accept="image/*"
                   multiple type="file"
                   onChange={handleChangeCover}/>
        </Button>

        {coverUrl && <Avatar
            sx={{width: '100%', height: 120, marginTop: 2, marginBottom: 2}}
            src={coverUrl as string}
            variant="rounded"/>}

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
            <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</MyButton>
            <MyButton style={{padding: '8px 44px'}} type={'submit'}>Save</MyButton>
        </div>
    </form>
}
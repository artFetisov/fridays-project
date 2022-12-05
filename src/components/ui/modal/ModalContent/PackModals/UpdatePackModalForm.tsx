import {TextField} from "@mui/material";
import styles from "./PackModals.module.scss";
import {Button} from "../../../button/Button";
import React from "react";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {setIsOpenModal} from "../../../../../store/reducers/modal/modal.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUpdatePackData} from "../../../../../types/packs";
import {updatePackTC} from "../../../../../store/reducers/pack/pack.actions";
import {useAppSelector} from "../../../../../hooks/useAppSelector";
import {useLocation} from "react-router-dom";
import {setCardsPackName} from "../../../../../store/reducers/card/card.slice";

export const UpdatePackModalForm = () => {
    const dispatch = useAppDispatch()

    const {pathname} = useLocation()

    const isNowCardsPage = pathname.includes('cards')

    const currentPackData = useAppSelector(state => state.modal.currentPackData)

    const handleCloseModal = () => {
        dispatch(setIsOpenModal(false))
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IUpdatePackData>()

    const onSubmit: SubmitHandler<IUpdatePackData> = async (data) => {
        const updatedPackData: IUpdatePackData = {
            ...data,
            _id: currentPackData._id
        }
        handleCloseModal()
        dispatch(updatePackTC(updatedPackData))
        isNowCardsPage && dispatch(setCardsPackName(data.name))

    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            id="packName"
            label="Pack name"
            error={!!errors.name}
            helperText={errors.name?.message || ''}
            variant="standard"
            fullWidth
            defaultValue={currentPackData.name}
            className={styles.input}
            {...register('name')}
            style={{marginBottom: '15px'}}
        />

        {/*<FormControlLabel className={styles.input} control={<Checkbox/>}*/}
        {/*                  label="private"  {...register('private')}*/}
        {/*                  style={{marginTop: '10px'}} id={'private'}/>*/}

        <div className={styles.buttonsBox}>
            <Button variant={'white'} type={'button'} onClick={handleCloseModal}>Cancel</Button>
            <Button style={{padding: '8px 44px'}} type={'submit'}>Save</Button>
        </div>
    </form>
}
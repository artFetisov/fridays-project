import React, { ChangeEvent, useState } from 'react'

import { Avatar, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { setCardsPackName } from '../../../../../store/reducers/card/card.slice'
import { setIsOpenModal } from '../../../../../store/reducers/modal/modal.slice'
import { updatePackTC } from '../../../../../store/reducers/pack/pack.actions'
import { IUpdatePackData } from '../../../../../types/packs'
import { changeImageHandler } from '../../../../../utils/image'

import { Button as MyButton } from '././../../../button/Button'
import styles from './PackModals.module.scss'

export const UpdatePackModalForm = () => {
  const dispatch = useAppDispatch()

  const [coverUrl, setCoverUrl] = useState<string | ArrayBuffer>('')

  const { pathname } = useLocation()

  const isNowCardsPage = pathname.includes('cards')

  const currentPackData = useAppSelector(state => state.modal.currentPackData)

  const handleCloseModal = () => {
    dispatch(setIsOpenModal(false))
  }

  const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
    changeImageHandler(event, setCoverUrl)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUpdatePackData>()

  const onSubmit: SubmitHandler<IUpdatePackData> = async data => {
    const updatedPackData: IUpdatePackData = {
      ...data,
      _id: currentPackData._id,
      deckCover: (coverUrl as string) || (currentPackData.deckCover as string),
    }

    handleCloseModal()
    dispatch(updatePackTC(updatedPackData))
    isNowCardsPage && dispatch(setCardsPackName(data.name))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button variant="contained" component="label">
        Edit cover
        <input hidden accept="image/*" multiple type="file" onChange={handleChangeCover} />
      </Button>

      {(currentPackData.deckCover || coverUrl) && (
        <Avatar
          sx={{ width: '100%', height: 120, marginTop: 2, marginBottom: 2 }}
          src={(coverUrl as string) || (currentPackData.deckCover as string)}
          variant="rounded"
        ></Avatar>
      )}

      {!currentPackData.deckCover && !coverUrl && (
        <Avatar
          sx={{
            width: '100%',
            height: 120,
            marginTop: 2,
            marginBottom: 2,
          }}
          variant="rounded"
        >
          {'no cover'}
        </Avatar>
      )}

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
        style={{ marginBottom: '15px' }}
      />

      <FormControlLabel
        className={styles.input}
        control={<Checkbox defaultChecked={currentPackData.private} />}
        label="private"
        {...register('private')}
        style={{ marginTop: '10px' }}
        id={'private'}
      />

      <div className={styles.buttonsBox}>
        <MyButton variant={'white'} type={'button'} onClick={handleCloseModal}>
          Cancel
        </MyButton>
        <MyButton style={{ padding: '8px 44px' }} type={'submit'}>
          Save
        </MyButton>
      </div>
    </form>
  )
}

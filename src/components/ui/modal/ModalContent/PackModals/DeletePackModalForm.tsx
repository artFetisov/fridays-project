import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { PATH } from '../../../../../routes/router.data'
import { setIsOpenModal } from '../../../../../store/reducers/modal/modal.slice'
import { deletePackTC } from '../../../../../store/reducers/pack/pack.actions'
import { Button } from '../../../button/Button'

import styles from './PackModals.module.scss'

export const DeletePackModalForm = () => {
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const isNowCardsPage = pathname.includes('cards')

  const currentPackData = useAppSelector(state => state.modal.currentPackData)

  const handleCloseModal = () => {
    dispatch(setIsOpenModal(false))
  }

  const handleDeletePack = async () => {
    await dispatch(deletePackTC({ packId: currentPackData._id }))

    handleCloseModal()
    isNowCardsPage && navigate(PATH.PACKS)
  }

  return (
    <>
      <div className={styles.question}>
        <div>
          Do you really want to remove{' '}
          <span className={styles.packName}>{currentPackData.name}</span>?
        </div>
        <div>All cards will be deleted.</div>
      </div>

      <div className={styles.buttonsBox}>
        <Button variant={'white'} type={'button'} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button type={'submit'} variant={'red'} onClick={handleDeletePack}>
          Delete
        </Button>
      </div>
    </>
  )
}

import React, { FC } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolIcon from '@mui/icons-material/School'
import { Avatar, Skeleton } from '@mui/material'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
  setCurrentContentModal,
  setCurrentPackData,
  setIsOpenModal,
  setModalTitle,
} from '../../../store/reducers/modal/modal.slice'
import { IPack } from '../../../types/packs'
import { getCorrectDate } from '../../../utils/date'
import { DeletePackModalForm } from '../../ui/modal/ModalContent/PackModals/DeletePackModalForm'
import { UpdatePackModalForm } from '../../ui/modal/ModalContent/PackModals/UpdatePackModalForm'

import styles from './PacksTable.module.scss'

interface IPackProps {
  pack: IPack
}

export const PackItem: FC<IPackProps> = ({ pack }) => {
  const dispatch = useAppDispatch()

  const myId = useAppSelector(state => state.user.user?._id)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = appStatus === 'loading'

  const navigate = useNavigate()

  const redirect = () => {
    if (pack.cardsCount > 0 || pack.user_id === myId) {
      return navigate(`/cards/${pack._id}`)
    }
  }

  const handleUpdatePack = () => {
    dispatch(setModalTitle('Edit pack'))
    dispatch(setCurrentContentModal(UpdatePackModalForm))
    dispatch(
      setCurrentPackData({
        _id: pack._id,
        name: pack.name,
        private: pack.private,
        deckCover: pack.deckCover,
      })
    )
    dispatch(setIsOpenModal(true))
  }

  const handleDeletePack = () => {
    dispatch(setModalTitle('Delete pack'))
    dispatch(setCurrentContentModal(DeletePackModalForm))
    dispatch(setCurrentPackData({ _id: pack._id, name: pack.name }))
    dispatch(setIsOpenModal(true))
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width={'100%'} variant={'rounded'} height={46} sx={{ marginTop: 0.6 }} />
      ) : (
        <div className={styles.pack}>
          <div
            className={cn(styles.coverAndNameBox, {
              [styles.hover]: pack.cardsCount > 0 || pack.user_id === myId,
            })}
            onClick={redirect}
          >
            <Avatar
              src={pack.deckCover}
              sx={{ width: 57, height: 42, marginRight: 2 }}
              variant="rounded"
            >
              {!pack.deckCover && 'no cover'}
            </Avatar>
            <span>{pack.name}</span>
          </div>
          <span>{pack.cardsCount}</span>
          <span>{getCorrectDate(pack.updated)}</span>
          <span className={styles.userName}>{pack.user_name}</span>
          <span>
            {pack.user_id === myId ? (
              <div className={styles.iconsBox}>
                <SchoolIcon onClick={redirect} />
                <BorderColorIcon onClick={handleUpdatePack} />
                <DeleteOutlineIcon onClick={handleDeletePack} />
              </div>
            ) : (
              <div className={styles.iconsBox}>
                <SchoolIcon
                  className={cn({
                    [styles.disabled]: pack.cardsCount <= 0,
                  })}
                  onClick={redirect}
                />
              </div>
            )}
          </span>
        </div>
      )}
    </>
  )
}

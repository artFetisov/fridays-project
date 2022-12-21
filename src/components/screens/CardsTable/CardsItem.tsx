import React, { FC } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Avatar, Skeleton } from '@mui/material'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
  setCurrentCardData,
  setCurrentContentModal,
  setIsOpenModal,
  setModalTitle,
} from '../../../store/reducers/modal/modal.slice'
import { ICard } from '../../../types/cards'
import { getCorrectDate } from '../../../utils/date'
import { DeleteCardModalForm } from '../../ui/modal/ModalContent/CardModals/DeleteCardModalForm'
import { UpdateCardModalForm } from '../../ui/modal/ModalContent/CardModals/UpdateCardModalForm'
import { MyRating } from '../../ui/rating/Rating'

import styles from './CardsTable.module.scss'

interface ICardItemProps {
  card: ICard
  isMyPack: boolean
}

export const CardsItem: FC<ICardItemProps> = ({ card, isMyPack }) => {
  const dispatch = useAppDispatch()

  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = appStatus === 'loading'

  const handleUpdateCard = () => {
    dispatch(setModalTitle('Edit card'))
    dispatch(setCurrentContentModal(UpdateCardModalForm))
    dispatch(
      setCurrentCardData({
        _id: card._id,
        answer: card.answer,
        question: card.question,
        answerImg: card.answerImg,
        questionImg: card.questionImg,
      })
    )
    dispatch(setIsOpenModal(true))
  }

  const handleDeleteCard = () => {
    dispatch(setModalTitle('Delete card'))
    dispatch(setCurrentContentModal(DeleteCardModalForm))
    dispatch(
      setCurrentCardData({
        _id: card._id,
        answer: card.answer,
        question: card.question,
        answerImg: card.answerImg,
        questionImg: card.questionImg,
      })
    )
    dispatch(setIsOpenModal(true))
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width={'100%'} variant={'rounded'} height={46} sx={{ marginTop: 0.6 }} />
      ) : (
        <div className={`${isMyPack ? styles.myCard : styles.card}`}>
          <>
            {card?.questionImg ? (
              <Avatar src={card.questionImg} sx={{ width: 104, height: 42 }} variant="rounded" />
            ) : (
              <span>{card.question}</span>
            )}
          </>
          <>
            {card?.answerImg ? (
              <Avatar src={card.answerImg} sx={{ width: 104, height: 42 }} variant="rounded" />
            ) : (
              <span>{card.answer}</span>
            )}
          </>
          <span>{getCorrectDate(card.updated)}</span>
          <span>
            <MyRating grade={card.grade} />
          </span>
          {isMyPack && (
            <div className={styles.iconsBox}>
              <BorderColorIcon fontSize={'small'} onClick={handleUpdateCard} />
              <DeleteOutlineIcon fontSize={'small'} onClick={handleDeleteCard} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

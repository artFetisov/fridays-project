import React, { FC } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import cn from 'classnames'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getCardsTC } from '../../../store/reducers/card/card.actions'
import { setSortCardsValue } from '../../../store/reducers/card/card.slice'
import { ICard } from '../../../types/cards'

import { CardsItem } from './CardsItem'
import styles from './CardsTable.module.scss'

interface ICardsTableProps {
  isMyPack: boolean
  cards: ICard[]
}

export const CardsTable: FC<ICardsTableProps> = ({ isMyPack, cards }) => {
  const dispatch = useAppDispatch()

  const sortCardsValue = useAppSelector(state => state.card.sortCardsValue)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const handleChangeSortCardsValue = () => {
    dispatch(setSortCardsValue(sortCardsValue === '0updated' ? '1updated' : '0updated'))
    dispatch(getCardsTC())
  }

  if (!cards.length) {
    return <></>
  }

  return (
    <div className={styles.cardsTable}>
      {!isMyPack && (
        <>
          <div className={styles.titles}>
            <span>Question</span>
            <span>Answer</span>
            <span
              className={cn(styles.iconsBox, {
                [styles.disabled]: appStatus === 'loading',
              })}
            >
              Last Updated{' '}
              {sortCardsValue === '0updated' ? (
                <ArrowDropDownIcon onClick={handleChangeSortCardsValue} cursor={'pointer'} />
              ) : (
                <ArrowDropUpIcon onClick={handleChangeSortCardsValue} cursor={'pointer'} />
              )}
            </span>
            <span>Grade</span>
          </div>
        </>
      )}

      {isMyPack && (
        <>
          <div className={styles.myTitles}>
            <span>Question</span>
            <span>Answer</span>
            <span
              className={cn(styles.iconsBox, {
                [styles.disabled]: appStatus === 'loading',
              })}
            >
              Last Updated{' '}
              {sortCardsValue === '0updated' ? (
                <ArrowDropDownIcon onClick={handleChangeSortCardsValue} cursor={'pointer'} />
              ) : (
                <ArrowDropUpIcon onClick={handleChangeSortCardsValue} cursor={'pointer'} />
              )}
            </span>
            <span>Grade</span>
            <span></span>
          </div>
        </>
      )}

      <div className={`${isMyPack ? styles.myCards : styles.cards}`}>
        {cards.map(card => (
          <CardsItem card={card} key={card._id} isMyPack={isMyPack} />
        ))}
      </div>
    </div>
  )
}

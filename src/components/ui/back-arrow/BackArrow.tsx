import React, { FC } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { PATH } from '../../../routes/router.data'

import styles from './BackArrow.module.scss'

export const BackArrow: FC = () => {
  const userStatus = useAppSelector(state => state.user.userRequestStatus)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = userStatus === 'loading'
  const isLoadingApp = appStatus === 'loading'

  return (
    <Link
      to={PATH.PACKS}
      className={cn(styles.backArrowWrapper, {
        [styles.disabled]: isLoadingApp || isLoading,
      })}
    >
      <KeyboardBackspaceIcon />
      <span>To Packs List</span>
    </Link>
  )
}

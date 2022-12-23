import React, { FC } from 'react'

import { Avatar } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { PATH } from '../../../routes/router.data'
import { Button } from '../../ui/button/Button'
import { MyTooltip } from '../../ui/tooltip/MyTooltip'
import { ProfileTooltip } from '../../ui/tooltip/ProfileTooltip'

import styles from './Header.module.scss'
import { Label } from './Label'

export const Header: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const user = useAppSelector(state => state.user.user)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const { pathname } = useLocation()

  return (
    <header className={styles.header}>
      <Label />
      {isAuth && (
        <div className={styles.name}>
          <span>{user?.name}</span>
        </div>
      )}
      {!isAuth && (
        <Button disabled>
          {pathname !== PATH.REGISTRATION && !isAuth && 'Sign In'}
          {pathname === PATH.REGISTRATION && 'Sign Up'}
        </Button>
      )}
      {isAuth && (
        <>
          {pathname === PATH.PROFILE ? (
            <Link to={PATH.PROFILE}>
              <Avatar
                style={{ marginLeft: '12px', color: '#000000' }}
                sx={{ width: 36, height: 36 }}
                alt="Travis Howard"
                src={user?.avatar || '/static/images/avatar/2.jpg'}
              />
            </Link>
          ) : (
            <MyTooltip element={<ProfileTooltip />} disabled={appStatus === 'loading'}>
              <Link to={PATH.PROFILE}>
                <Avatar
                  style={{ marginLeft: '12px', color: '#000000' }}
                  sx={{ width: 36, height: 36 }}
                  alt="Travis Howard"
                  src={user?.avatar || '/static/images/avatar/2.jpg'}
                />
              </Link>
            </MyTooltip>
          )}
        </>
      )}
    </header>
  )
}

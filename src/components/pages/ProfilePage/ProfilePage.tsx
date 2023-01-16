import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Badge, IconButton, Skeleton } from '@mui/material'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { PATH } from '../../../routes/router.data'
import { logoutTC } from '../../../store/reducers/auth/auth.actions'
import { updateUserDataTC } from '../../../store/reducers/user/user.actions'
import { changeImageHandler } from '../../../utils/image'
import { BackArrow } from '../../ui/back-arrow/BackArrow'
import { Button } from '../../ui/button/Button'
import { EditableSpan } from '../../ui/editable-span/EditableSpan'

import styles from './ProfilePage.module.scss'

export const ProfilePage: FC = () => {
  const user = useAppSelector(state => state.user.user)
  const userStatus = useAppSelector(state => state.user.userRequestStatus)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = userStatus === 'loading'
  const isLoadingApp = appStatus === 'loading'

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const redirect = () => {
    navigate(PATH.LOGIN)
  }

  const [dataUrl, setDataUrl] = useState<string | ArrayBuffer>('')

  const updateAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeImageHandler(event, setDataUrl)
  }

  useEffect(() => {
    if (dataUrl) {
      dispatch(updateUserDataTC({ name: user?.name as string, avatar: dataUrl, redirect }))
    }
  }, [dataUrl])

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={styles.container}>
      <BackArrow />
      <div className={styles.profileWrapper}>
        <h3 className={styles.title}>Personal Information</h3>
        <div
          className={cn(styles.avatar, {
            [styles.disabled]: isLoadingApp,
          })}
        >
          {isLoading ? (
            <Skeleton sx={{ width: 96, height: 96 }} variant={'circular'} />
          ) : (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <div className={styles.iconWrapper}>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={updateAvatarHandler} />
                    <PhotoCameraIcon style={{ color: 'white' }} fontSize={'small'} />
                  </IconButton>
                </div>
              }
            >
              <Avatar
                sx={{ width: 96, height: 96 }}
                alt="Travis Howard"
                src={user?.avatar || '/static/images/avatar/2.jpg'}
              />
            </Badge>
          )}
        </div>
        <EditableSpan name={user?.name} />
        <div className={styles.email}>
          <span>{isLoading ? <Skeleton /> : user?.email}</span>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            variant={'white'}
            disabled={isLoading || appStatus === 'loading'}
            onClick={logoutHandler}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutIcon fontSize={'small'} />
              <span style={{ marginLeft: '8px' }}>Log out</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

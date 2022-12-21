import React, { FC } from 'react'

import { Pagination } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { MySelect } from '../select/MySelect'

import styles from './Paginator.module.scss'

interface IPaginatorProps {
  page: number
  pageCount: number
  totalCount: number
  handleChangeCurrentPage: (event: React.ChangeEvent<unknown>, value: number) => void
  handleChangePortionSize: (event: SelectChangeEvent) => void
}

export const Paginator: FC<IPaginatorProps> = ({
  page,
  pageCount,
  totalCount,
  handleChangeCurrentPage,
  handleChangePortionSize,
}) => {
  const pagesCount = Math.ceil(totalCount / pageCount)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = appStatus === 'loading'

  return (
    <div className={styles.paginatorBox}>
      <Pagination
        disabled={isLoading}
        count={pagesCount}
        page={page}
        onChange={handleChangeCurrentPage}
      />
      <span>Show</span>
      <MySelect handleChangePortionSize={handleChangePortionSize} pageCount={pageCount} />
      <span>Cards per Page</span>
    </div>
  )
}

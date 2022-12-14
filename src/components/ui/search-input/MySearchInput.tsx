import React, { FC } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'

import styles from './MySearchInput.module.scss'

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fill: 'D9D9D9',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

interface IMySearchInput {
  handleSearch: (value: string) => void
  fullWidth?: boolean
  disabled?: boolean
  value?: string
}

export const MySearchInput: FC<IMySearchInput> = ({ fullWidth, handleSearch, disabled, value }) => {
  return (
    <div className={`${styles.searchBox} ${fullWidth && styles.fullWidth}`}>
      <SearchIconWrapper>
        <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
      </SearchIconWrapper>
      <input
        disabled={disabled}
        defaultValue={value}
        onChange={e => handleSearch(e.currentTarget.value)}
        className={`${styles.searchInput}`}
        placeholder={'Provide your text'}
      />
    </div>
  )
}

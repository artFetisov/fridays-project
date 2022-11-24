import React, {FC, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/material/styles";
import styles from './MySearchInput.module.scss';


const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    fill: 'D9D9D9',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


export const MySearchInput: FC = () => {

    return <div className={styles.searchBox}>
        <SearchIconWrapper>
            <SearchIcon style={{color: 'rgba(0, 0, 0, 0.5)'}}/>
        </SearchIconWrapper>
        <input className={styles.searchInput} placeholder={'Provide your text'}/>
    </div>
}

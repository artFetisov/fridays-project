import React, {FC} from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppSelector} from "../../../hooks/useAppSelector";

interface IMySelectProps {
    handleChangePortionSize: (event: SelectChangeEvent) => void
    pageCount: number
}


export const MySelect: FC<IMySelectProps> = ({handleChangePortionSize, pageCount}) => {
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = appStatus === 'loading'

    return <FormControl sx={{m: 1, minWidth: 40}} size="small">
        <Select
            disabled={isLoading}
            labelId="demo-select-small"
            id="demo-select-small"
            value={String(pageCount)}
            onChange={handleChangePortionSize}
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
    </FormControl>
}

import React, {FC, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setPageCount} from "../../../store/reducers/pack/pack.slice";
import {getAllPacksTC} from "../../../store/reducers/pack/pack.actions";

export const MySelect: FC = () => {
    const dispatch = useAppDispatch()

    const [portionSize, setPortionSize] = useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setPortionSize(event.target.value);
        dispatch(setPageCount(Number(event.target.value)))
        dispatch(getAllPacksTC())
    };


    return <FormControl sx={{m: 1, minWidth: 40}} size="small">
        <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={portionSize}
            onChange={handleChange}
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
    </FormControl>
}

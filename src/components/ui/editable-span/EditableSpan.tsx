import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import styles from './EditableSpan.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {fontTheme} from "../../../assets/materialUiThemes";
import {ThemeProvider} from "@mui/material/styles";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {Button} from "../button/Button";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {updateUserDataTC} from "../../../store/reducers/user/user.actions";

interface IEditableSpanProps {
    name?: string | undefined
}

export const EditableSpan: FC<IEditableSpanProps> = ({name}) => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const isDisabled = false

    const [editMode, setEditMode] = useState(false)
    const [newValue, setNewValue] = useState('')


    const setEditModeHandler = () => {
        if (!isDisabled) {
            if (name) setNewValue(name)
            setEditMode(true)
        }
    }

    const changeField = () => {
        setEditMode(false)
        dispatch(updateUserDataTC({name: newValue, avatar: user?.avatar as string}))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeField()
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }

    return editMode ? <div className={styles.editSpanWrapper}>
            <ThemeProvider theme={fontTheme}>
                <TextField
                    label={'Nickname'}
                    fullWidth
                    autoFocus
                    onKeyDown={onKeyPressHandler}
                    onBlur={changeField}
                    onChange={onChangeTitleHandler}
                    value={newValue}
                    variant="standard"
                    disabled={isDisabled}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Button onClick={changeField} variant={'no-radius'}>SAVE</Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </ThemeProvider>
        </div>
        : <div className={styles.editSpanWrapper}>
            <span onDoubleClick={setEditModeHandler}>{name}</span>
            <span className={styles.icon}><BorderColorIcon onClick={setEditModeHandler} fontSize={'small'}/></span>
        </div>
}
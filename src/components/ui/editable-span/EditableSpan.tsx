import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {InputAdornment, Skeleton, TextField} from "@mui/material";
import styles from './EditableSpan.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {fontTheme} from "../../../assets/materialUiThemes";
import {ThemeProvider} from "@mui/material/styles";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {Button} from "../button/Button";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {updateUserDataTC} from "../../../store/reducers/user/user.actions";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../routes/router.data";
import cn from 'classnames';

interface IEditableSpanProps {
    name?: string | undefined
}

export const EditableSpan: FC<IEditableSpanProps> = ({name}) => {
    const user = useAppSelector(state => state.user.user)
    const userStatus = useAppSelector(state => state.user.userRequestStatus)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const isLoading = userStatus === 'loading'

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [localError, setLocalError] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [newValue, setNewValue] = useState('')

    const redirect = () => navigate(PATH.LOGIN)

    const setEditModeHandler = () => {
        if (name) {
            setNewValue(name)
        }
        setEditMode(true)
    }

    const changeField = () => {
        if (name?.trim() !== newValue.trim()) {
            dispatch(updateUserDataTC({name: newValue.trim(), avatar: user?.avatar as string, redirect}))
        }
        setEditMode(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeField()
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (value.length >= 20) {
            setLocalError('Max length 20 symbols')
            return
        }


        if (localError) {
            setLocalError('')
        }

        setNewValue(value)
    }

    return editMode ? <div className={cn(styles.editSpanWrapper, {
            [styles.disabled]: appStatus === 'loading'
        })}>
            <ThemeProvider theme={fontTheme}>
                <TextField
                    label={'Nick name'}
                    fullWidth
                    autoFocus
                    onKeyDown={onKeyPressHandler}
                    onBlur={changeField}
                    onChange={onChangeTitleHandler}
                    value={newValue}
                    variant="standard"
                    helperText={'Max length 20 symbols'}
                    error={localError.length > 0}
                    disabled={isLoading || appStatus === 'loading'}
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
        : <div className={cn(styles.editSpanWrapper, {
            [styles.disabled]: appStatus === 'loading'
        })}>
            {!isLoading ? <>
                    <span onDoubleClick={setEditModeHandler}>{name}</span>
                    <span className={styles.icon}><BorderColorIcon
                        style={{width: '16px', height: '16px'}} onClick={setEditModeHandler} fontSize={'small'}/></span></>
                : <Skeleton/>
            }
        </div>
}
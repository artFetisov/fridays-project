import React, {ChangeEvent, FC, useEffect, useState} from "react";
import styles from './ProfilePage.module.scss';
import {Avatar, Badge, IconButton} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {EditableSpan} from "../../ui/editable-span/EditableSpan";
import {Button} from "../../ui/button/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutTC} from "../../../store/reducers/auth/auth.actions";
import {updateUserDataTC} from "../../../store/reducers/user/user.actions";
import {getFileReaderURL} from "../../../utils/fileReader";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Link} from "react-router-dom";
import {PATH} from "../../../routes/router.data";

export const ProfilePage: FC = () => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const [dataUrl, setDataUrl] = useState<string | ArrayBuffer>('')

    const updateAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event?.target?.files[0]
            getFileReaderURL(file, setDataUrl)
        }
    }

    useEffect(() => {
        if (dataUrl) {
            dispatch(updateUserDataTC({name: user?.name as string, avatar: dataUrl}))
        }
    }, [dataUrl])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }


    return <div className={styles.container}>
        <Link to={PATH.PACKS}>
            <div className={styles.backArrowWrapper}>
                <KeyboardBackspaceIcon/>
                <span>Back to Packs List</span>
            </div>
        </Link>
        <div className={styles.profileWrapper}>
            <h3 className={styles.title}>Personal Information</h3>
            <div className={styles.avatar}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <div className={styles.iconWrapper}>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={updateAvatarHandler}/>
                                <PhotoCameraIcon color={'inherit'} fontSize={'small'}/>
                            </IconButton>
                        </div>
                    }
                >
                    <Avatar sx={{width: 96, height: 96}} alt="Travis Howard"
                            src={user?.avatar || "/static/images/avatar/2.jpg"}/>
                </Badge>
            </div>
            <EditableSpan name={user?.name}/>
            <div className={styles.email}>
                <span>{user?.email}</span>
            </div>
            <div className={styles.btnWrapper}>
                <Button variant={'white'} onClick={logoutHandler}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LogoutIcon fontSize={'small'}/>
                        <span style={{marginLeft: '8px'}}>
                       Log out
                   </span>
                    </div>
                </Button>
            </div>
        </div>
    </div>
}
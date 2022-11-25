import React, {FC} from "react";
import {IPack, IUpdatePackData} from "../../../types/packs";
import styles from './PacksTable.module.scss';
import {getCorrectDate} from "../../../utils/date";
import {useAppSelector} from "../../../hooks/useAppSelector";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {deletePackTC, updatePackTC} from "../../../store/reducers/pack/pack.actions";
import {useNavigate} from "react-router-dom";

interface IPackProps {
    pack: IPack
}

export const PackItem: FC<IPackProps> = ({pack}) => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector(state => state.user.user?._id)
    const navigate = useNavigate()

    const redirect = () => {
        return navigate(`/cards/${pack._id}`)
    }

    const handleUpdatePack = () => {
        const newPack: IUpdatePackData = {
            name: 'updated name',
            _id: pack._id
        }
        dispatch(updatePackTC(newPack))
    }

    const handleDeletePack = () => {
        dispatch(deletePackTC({packId: pack._id}))
    }


    return <div className={styles.pack}>
        <span>{pack.name}</span>
        <span>{pack.cardsCount}</span>
        <span>{getCorrectDate(pack.updated)}</span>
        <span className={styles.userName}>{pack.user_name}</span>
        <span>
            {pack.user_id === myId
                ? <div className={styles.iconsBox}>
                    <SchoolIcon fontSize={'small'} onClick={redirect}/>
                    <BorderColorIcon fontSize={'small'} onClick={handleUpdatePack}/>
                    <DeleteOutlineIcon fontSize={'small'} onClick={handleDeletePack}/>
                </div>
                : <div className={styles.iconsBox}><SchoolIcon fontSize={'small'} onClick={redirect}/></div>
            }
        </span>
    </div>
}
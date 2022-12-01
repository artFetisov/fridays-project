import React, {FC, MouseEvent} from "react";
import styles from './Modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setIsOpenModal} from "../../../store/reducers/modal/modal.slice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {fontTheme} from "../../../assets/materialUiThemes";
import {ThemeProvider} from "@mui/material/styles";

export const LayoutModal: FC = () => {
    const dispatch = useAppDispatch()
    const modalTitle = useAppSelector(state => state.modal.modalTitle)
    const Content = useAppSelector(state => state.modal.CurrentContentModal)
    const isOpenModal = useAppSelector(state => state.modal.isOpenModal)

    const handleCloseModal = (event: MouseEvent<HTMLDivElement> | MouseEvent<SVGSVGElement>) => {
        event.stopPropagation()
        dispatch(setIsOpenModal(false))
    }

    return <>
        {isOpenModal && <div className={styles.modalContainer} onClick={handleCloseModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.topBox}>
                    <div>{modalTitle}</div>
                    <CloseIcon cursor={'pointer'} onClick={handleCloseModal}/>
                </div>
                <div className={styles.modalBox}>
                    <ThemeProvider theme={fontTheme}>
                        {<Content/>}
                    </ThemeProvider>
                </div>
            </div>
        </div>}
    </>
}
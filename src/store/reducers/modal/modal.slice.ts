import {AddPackModalForm} from "../../../components/ui/modal/ModalContent/PackModals/AddPackModalForm";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUpdatePackData} from "../../../types/packs";


interface IModalState {
    isOpenModal: boolean
    CurrentContentModal: () => JSX.Element
    modalTitle: string
    currentPackData: IUpdatePackData
}

const initialState: IModalState = {
    isOpenModal: false,
    CurrentContentModal: AddPackModalForm,
    modalTitle: '',
    currentPackData: {
        _id: '',
        name: ''
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpenModal = action.payload
        },
        setCurrentContentModal(state, action: PayloadAction<() => JSX.Element>) {
            state.CurrentContentModal = action.payload
        },
        setModalTitle(state, action: PayloadAction<string>) {
            state.modalTitle = action.payload
        },
        setCurrentPackData(state, action: PayloadAction<IUpdatePackData>) {
            state.currentPackData = action.payload
        }
    }
})

export const {setIsOpenModal, setCurrentContentModal, setModalTitle, setCurrentPackData} = modalSlice.actions

export const {reducer} = modalSlice
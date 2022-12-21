import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AddPackModalForm } from '../../../components/ui/modal/ModalContent/PackModals/AddPackModalForm'
import { IUpdateCardData } from '../../../types/cards'
import { IUpdatePackData } from '../../../types/packs'

interface IModalState {
  isOpenModal: boolean
  CurrentContentModal: () => JSX.Element
  modalTitle: string
  currentPackData: IUpdatePackData
  currentCardData: IUpdateCardData
}

const initialState: IModalState = {
  isOpenModal: false,
  CurrentContentModal: AddPackModalForm,
  modalTitle: '',
  currentPackData: {
    _id: '',
    name: '',
  },
  currentCardData: {
    _id: '',
    answer: '',
    question: '',
    answerImg: '',
    questionImg: '',
  },
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
    },
    setCurrentCardData(state, action: PayloadAction<IUpdateCardData>) {
      state.currentCardData = action.payload
    },
  },
})

export const {
  setIsOpenModal,
  setCurrentContentModal,
  setModalTitle,
  setCurrentPackData,
  setCurrentCardData,
} = modalSlice.actions

export const { reducer } = modalSlice

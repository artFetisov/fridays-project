import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from "../../../services/userService";
import {AppRootState} from "../../index";
import {setUserData} from "./user.slice";

export const updateUserDataTC = createAsyncThunk<void, { name: string, avatar: ArrayBuffer | string }, { state: AppRootState }>
('user/updateData', async (data, {
    dispatch,
}) => {
    try {
        const response = await userService.updateUserData(data)
        dispatch(setUserData(response.updatedUser))

    } catch (error) {
        alert(error)
    }
})


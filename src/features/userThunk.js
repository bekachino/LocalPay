import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { errorMessages } from "../constants";
import { addAlert } from "./dataSlice";

export const signIn = createAsyncThunk('user/signIn', async (userData, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApi.post("token/", userData);
    dispatch(addAlert({type: 'success', message: 'Вы вошли в систему'}));
    return response.data;
  } catch (e) {
    dispatch(addAlert({type: 'error', message: errorMessages[e.response.status]}));
    return rejectWithValue(errorMessages[e.response.status]);
  }
});

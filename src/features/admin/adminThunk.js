import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from "../data/dataSlice";
import { errorMessages } from "../../constants";

export const createUser = createAsyncThunk('user/createUser', async (data, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi.post('user/create/', data);
    const res = await req.data;
    dispatch(addAlert({
      type: 'success',
      message: 'Пользователь успешно создан'
    }));
    return res;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: errorMessages[e?.response?.status || 500]
    }));
    return rejectWithValue(errorMessages[e.response.status]);
  }
});

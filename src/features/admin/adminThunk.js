import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from "../data/dataSlice";
import { errorMessages } from "../../constants";

export const createUser = createAsyncThunk('admin/createUser', async (data, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi.post('user/create/', data);
    dispatch(addAlert({
      type: 'success',
      message: 'Пользователь успешно создан'
    }));
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: errorMessages[e?.response?.status || 500]
    }));
    return rejectWithValue(errorMessages[e.response.status]);
  }
});

export const getUsers = createAsyncThunk('admin/getUsers', async (_, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi('users/');
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: errorMessages[e?.response?.status || 500]
    }));
    return rejectWithValue(errorMessages[e.response.status]);
  }
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi.delete(`user/${userId}/delete_user/`, userId);
    dispatch(addAlert({
      type: 'success',
      message: 'Пользователь успешно удалён'
    }));
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: errorMessages[e?.response?.status || 500]
    }));
    return rejectWithValue(errorMessages[e.response.status]);
  }
});

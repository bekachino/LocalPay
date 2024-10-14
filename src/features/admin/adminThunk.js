import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from "../data/dataSlice";
import { ERROR_MESSAGES } from "../../constants";

export const getUsers = createAsyncThunk('admin/getUsers', async ({
  page,
  page_size,
  searchWord,
}, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi(`users/?page=${page}&page_size=${page_size}&search=${searchWord}`);
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

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
      message: e?.response?.status === 400 ? 'Пользователь с таким логином уже сущесвует' : ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

export const editUser = createAsyncThunk('admin/editUser', async (userData, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi.put(`users/${userData?.id}/update_user/`, userData);
    dispatch(addAlert({
      type: 'success',
      message: 'Пользователь успешно изменён'
    }));
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e?.response?.status]);
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
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

export const getPayments = createAsyncThunk('admin/getPayments', async ({
  page,
  page_size,
  searchWord,
  date_from,
  date_to,
}, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi(`api/payment-history/?page=${page}&page_size=${page_size}&search=${searchWord || ''}&date_from=${date_from || ''}&date_to=${date_to || ''}`);
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

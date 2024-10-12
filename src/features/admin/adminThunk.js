import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from "../data/dataSlice";
import { ERROR_MESSAGES } from "../../constants";

export const getUsers = createAsyncThunk('admin/getUsers', async ({
  page,
  page_size
}, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi(`users/?page=${page}&page_size=${page_size}`);
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

export const getUser = createAsyncThunk('admin/getUser', async (userId, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi(`users/${userId}`);
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
  page_size
}, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const req = await axiosApi(`api/payment-history/?page=${page}&page_size=${page_size}`);
    return await req.data;
  } catch (e) {
    dispatch(addAlert({
      type: 'error',
      message: ERROR_MESSAGES[e?.response?.status || 500]
    }));
    return rejectWithValue(ERROR_MESSAGES[e.response.status]);
  }
});

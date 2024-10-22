import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ERROR_MESSAGES } from '../../constants';
import { addAlert } from '../data/dataSlice';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosApi.post('api/token/', userData);
      dispatch(
        addAlert({
          type: 'success',
          message: 'Вы вошли в систему',
        })
      );
      return response.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.response?.status || 500],
        })
      );
      return rejectWithValue(ERROR_MESSAGES[e.response.status]);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (noAlert, { dispatch }) => {
    try {
      return dispatch(
        addAlert({
          type: 'secondary',
          message: 'Вы вышли из системы',
        })
      );
    } catch {
      return dispatch(
        addAlert({
          type: 'warning',
          message: 'Не удалось выйти из системы. Попробуйте снова',
        })
      );
    }
  }
);

export const createPayment = createAsyncThunk(
  'user/createPayment',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosApi.post('api/create-payment/', data);
      dispatch(
        addAlert({
          type: 'success',
          message: 'Оплачено',
        })
      );
      return response.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.response?.status || 500],
        })
      );
      return rejectWithValue(ERROR_MESSAGES[e.response.status]);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from './dataSlice';
import { ERROR_MESSAGES } from '../../constants';

export const getUser = createAsyncThunk(
  'admin/getUser',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`users/${userId}/`);
      return await req.data;
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

import { createSlice } from '@reduxjs/toolkit';
import uuid from 'uuid-random';

const initialState = {
  alerts: [],
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlert: (state, { payload }) => {
      const id = uuid();
      state.alerts.push({
        ...payload,
        id,
        show: true
      });
    },
    removeAlert: (state, { payload }) => {
      state.alerts.find(alert => alert.id === payload).show = false;
    },
  },
  extraReducers: (builder) => {
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  addAlert,
  removeAlert
} = DataSlice.actions;

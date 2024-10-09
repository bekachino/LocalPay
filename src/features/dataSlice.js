import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlert: (state, payload) => {
      state.alerts.push(payload);
    },
    removeAlert: (state, payload) => {
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

import { createSlice } from '@reduxjs/toolkit';
import { getUser } from "./dataThunk";

const initialState = {
  alerts: [],
  user: null,
  getUserLoading: false,
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlert: (state, { payload }) => {
      const randomNumber1 = Math.random() * (
        20000 - 1000 + 1
      ) + 1000;
      const randomNumber2 = Math.random() * (
        20000 - 1000 + 1
      ) + 1000;
      const randomNumber3 = Math.random() * (
        20000 - 1000 + 1
      ) + 1000;
      
      state.alerts.push({
        ...payload,
        id: `${randomNumber1 * randomNumber2 + randomNumber3}`,
        show: true
      });
    },
    removeAlert: (state, { payload }) => {
      state.alerts.find(alert => alert.id === payload).show = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, state => {
      state.getUserLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload: res }) => {
      state.getUserLoading = false;
      state.user = res;
    });
    builder.addCase(getUser.rejected, state => {
      state.getUserLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  addAlert,
  removeAlert
} = DataSlice.actions;

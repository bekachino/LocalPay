import { createSlice } from '@reduxjs/toolkit';
import { createUser } from "./adminThunk";

const initialState = {
  createUserLoading: false,
};

const AdminSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, { payload: res }) => {
      state.createUserLoading = false;
    });
    builder.addCase(createUser.rejected, (state, { payload: error }) => {
      state.createUserLoading = false;
    });
  },
});

export const adminReducer = AdminSlice.reducer;
export const {} = AdminSlice.actions;

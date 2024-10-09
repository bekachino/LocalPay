import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUsers } from "./adminThunk";

const initialState = {
  users: [],
  createUserLoading: false,
  usersLoading: false,
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
    
    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload: res }) => {
      state.usersLoading = false;
      state.users = res;
    });
    builder.addCase(getUsers.rejected, (state, { payload: error }) => {
      state.usersLoading = false;
    });
  },
});

export const adminReducer = AdminSlice.reducer;
export const {} = AdminSlice.actions;

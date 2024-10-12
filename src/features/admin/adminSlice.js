import { createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  deleteUser,
  editUser, getPayments,
  getUser,
  getUsers
} from "./adminThunk";

const initialState = {
  users: [],
  usersPagesAmount: [],
  payments: [],
  paymentsPagesAmount: [],
  user: null,
  getUserLoading: false,
  usersLoading: false,
  createUserLoading: false,
  editUserLoading: false,
  paymentsLoading: false,
};

const AdminSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, state => {
      state.usersLoading = true;
      state.users = [];
    });
    builder.addCase(getUsers.fulfilled, (state, {
      payload: {
        total_pages,
        results
      }
    }) => {
      state.usersLoading = false;
      state.users = results || [];
      state.usersPagesAmount = total_pages || 1;
    });
    builder.addCase(getUsers.rejected, state => {
      state.usersLoading = false;
    });
    
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
    
    builder.addCase(createUser.pending, state => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, state => {
      state.createUserLoading = false;
    });
    builder.addCase(createUser.rejected, state => {
      state.createUserLoading = false;
    });
    
    builder.addCase(editUser.pending, state => {
      state.editUserLoading = true;
    });
    builder.addCase(editUser.fulfilled, state => {
      state.editUserLoading = false;
    });
    builder.addCase(editUser.rejected, state => {
      state.editUserLoading = false;
    });
    
    builder.addCase(deleteUser.pending, _ => {
    });
    builder.addCase(deleteUser.fulfilled, _ => {
    });
    builder.addCase(deleteUser.rejected, _ => {
    });
    
    builder.addCase(getPayments.pending, state => {
      state.paymentsLoading = true;
      state.payments = [];
    });
    builder.addCase(getPayments.fulfilled, (state, {
      payload: {
        total_pages,
        results
      }
    }) => {
      state.paymentsLoading = false;
      state.payments = results || [];
      state.paymentsPagesAmount = total_pages || 1;
    });
    builder.addCase(getPayments.rejected, state => {
      state.paymentsLoading = false;
    });
  },
});

export const adminReducer = AdminSlice.reducer;
export const {} = AdminSlice.actions;

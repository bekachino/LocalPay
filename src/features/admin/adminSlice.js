import { createSlice } from '@reduxjs/toolkit';
import {
  annulPayment,
  createUser,
  deleteUser,
  editUser, getComments,
  getPayments,
  getPaymentsForUpload,
  getUsers,
} from './adminThunk';

const initialState = {
  users: [],
  usersPagesAmount: 0,
  payments: [],
  comments: [],
  paymentsPagesAmount: 0,
  commentsPagesAmount: 0,
  paymentsForUploadLoading: false,
  usersLoading: false,
  createUserLoading: false,
  editUserLoading: false,
  paymentsLoading: false,
  commentsLoading: false,
};

const AdminSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearPayments: state => {
      state.payments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
      state.users = [];
      state.usersPagesAmount = 1;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, {
        payload: {
          total_pages,
          results,
          isSearch,
        },
      }) => {
        state.usersLoading = false;
        state.users = isSearch ? results : [
          ...state.users,
          ...results,
        ];
        state.usersPagesAmount = total_pages || 1;
      },
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });
    
    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.createUserLoading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.createUserLoading = false;
    });
    
    builder.addCase(editUser.pending, (state) => {
      state.editUserLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.editUserLoading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.editUserLoading = false;
    });
    
    builder.addCase(deleteUser.pending, (_) => {});
    builder.addCase(deleteUser.fulfilled, (_) => {});
    builder.addCase(deleteUser.rejected, (_) => {});
    
    builder.addCase(getPayments.pending, (state) => {
      state.paymentsLoading = true;
      state.paymentsPagesAmount = 1;
    });
    builder.addCase(
      getPayments.fulfilled,
      (state, {
        payload: {
          total_pages,
          results,
          isSearch,
        },
      }) => {
        state.paymentsLoading = false;
        state.payments = isSearch ? results : [
          ...state.payments,
          ...results,
        ];
        state.paymentsPagesAmount = total_pages || 1;
      },
    );
    builder.addCase(getPayments.rejected, (state) => {
      state.paymentsLoading = false;
    });
    
    builder.addCase(annulPayment.pending, (_) => {});
    builder.addCase(annulPayment.fulfilled, (_) => {});
    builder.addCase(annulPayment.rejected, (_) => {});
    
    builder.addCase(getPaymentsForUpload.pending, (state) => {
      state.paymentsForUploadLoading = true;
    });
    builder.addCase(getPaymentsForUpload.fulfilled, (state) => {
      state.paymentsForUploadLoading = false;
    });
    builder.addCase(getPaymentsForUpload.rejected, (state) => {
      state.paymentsForUploadLoading = false;
    });
    
    builder.addCase(getComments.pending, (state) => {
      state.commentsLoading = true;
      state.paymentsPagesAmount = 1;
    });
    builder.addCase(
      getComments.fulfilled,
      (state, {
        payload: {
          total_pages,
          results,
          isSearch,
        },
      }) => {
        state.commentsLoading = false;
        state.comments = isSearch ? results : [
          ...state.comments,
          ...results,
        ];
        state.commentsPagesAmount = total_pages || 1;
      },
    );
    builder.addCase(getComments.rejected, (state) => {
      state.commentsLoading = false;
    });
  },
});

export const adminReducer = AdminSlice.reducer;
export const { clearPayments } = AdminSlice.actions;

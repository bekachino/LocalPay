import { createSlice } from '@reduxjs/toolkit';
import { logout, signIn } from './userThunk';

const initialState = {
  user: null,
  signInLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.user = '';
      state.authorizationError = '';
      state.authorizationMessage = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
      state.user = res;
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
    });
    
    builder.addCase(logout.pending, (state) => {
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, { payload: res }) => {
    });
    builder.addCase(logout.rejected, (state, { payload: error }) => {
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const {} = UsersSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './userThunk';
import { useAppDispatch } from "../app/hooks";
import { addAlert } from "./dataSlice";

const initialState = {
  user: '',
  signInLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.user = '';
      state.authorizationError = '';
      state.authorizationMessage = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const {
  logout,
} = UsersSlice.actions;

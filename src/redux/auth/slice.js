import { createSlice } from '@reduxjs/toolkit';
import {
  refreshUser,
  fetchLogin,
  fetchLogout,
  fetchSignup,
} from './operations';

const initialState = {
  token: localStorage.getItem('token') ?? '',
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchSignup.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(fetchLogin.rejected, state => {
        state.token = '';
        state.user = {};
      })
      .addCase(fetchLogout.fulfilled, state => {
        state.token = '';
        state.user = {};
      })
      .addCase(fetchLogout.rejected, state => {
        state.token = '';
        state.user = {};
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        // state.token = '';
        state.user = payload;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.token = '';
      });
  },
});

export const userReducer = userSlice.reducer;

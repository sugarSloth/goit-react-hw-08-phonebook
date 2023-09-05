import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const fetchSignup = createAsyncThunk(
  'user/createUser',
  async (userRegisterInfo, thunkAPI) => {
    try {
      const response = await axios.post('users/signup', userRegisterInfo);
      setAuthHeader(response.data.token);
      window.localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'user/loginUser',
  async (userLoginInfo, thunkAPI) => {
    try {
      const response = await axios.post('users/login', userLoginInfo);
      setAuthHeader(response.data.token);
      window.localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.post('users/logout');
      window.localStorage.removeItem('token');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('users/current');
      return res.data;
    } catch (error) {
      window.localStorage.removeItem('token');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  user: User | null;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: any ;
}

export interface User {
  email: string;
  password: string
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: 'idle',
  error: "",
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string, password: string }) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/admin/login`, credentials);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.token = action.payload.token;
        // state.user = action.payload.user;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
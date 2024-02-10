import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Roles {
  id: number;
}

interface RolesState {
  roles: Roles[];
  user: Roles | null;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async ({ page, search }:any, { getState }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/roles/list?page=${page}&search=${search}`, {
        headers: {
          'token': `${localStorage.getItem('Token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    user: null,
    loading: 'idle',
    error: null,
  } as RolesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.roles = action.payload;
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to fetch roles.';
      })
  },
});

export default rolesSlice.reducer;
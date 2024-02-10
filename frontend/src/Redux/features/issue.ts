import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Issues {
  id: number;
}

interface IssueState {
  issues: Issues[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

export const addIssues = createAsyncThunk(
  'issues/addIssues',
  async (issues: { issues: string, status_id: string, project_id:string }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/admin/issues/add`, issues,{
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

export const editIssues = createAsyncThunk(
  'issues/editIssues',
  async ({ values, issueId }:any) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/admin/issues/update/${issueId}`,
        values,
        {
          headers: {
            'token': `${localStorage.getItem('Token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/issues/list`, {
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

export const deleteIssues = createAsyncThunk(
  'issues/deleteIssues',
  async ({ values, issueId }:any) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/admin/issues/delete/${issueId}`,
        values,
        {
          headers: {
            'token': `${localStorage.getItem('Token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    issues: [],
    loading: 'idle',
    error: null,
  } as IssueState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addIssues.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(addIssues.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.issues.push(action.payload);
      state.error = null
    })
    .addCase(addIssues.rejected, (state, action) => {
      state.loading = 'rejected';
    })
    .addCase(editIssues.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(editIssues.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.issues.push(action.payload);
      state.error = null
    })
    .addCase(editIssues.rejected, (state, action) => {
      state.loading = 'rejected';
    })
      .addCase(fetchIssues.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.issues = action.payload;
        state.error = null;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to fetch issues.';
      })
  },
});

export default issuesSlice.reducer;
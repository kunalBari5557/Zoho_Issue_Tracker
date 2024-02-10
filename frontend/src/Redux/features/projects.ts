import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Projects {
  id: number;
}

interface ProjectState {
  projects: Projects[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (projects: { projects: string }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/admin/projects/add`, projects,{
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

export const editProject = createAsyncThunk(
  'projects/editProject',
  async ({ values, issueId }:any) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/admin/projects/update/${issueId}`,
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


export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/projects/list`, {
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

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: 'idle',
    error: null,
  } as ProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addProject.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(addProject.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.projects.push(action.payload);
      state.error = null
    })
    .addCase(addProject.rejected, (state, action) => {
      state.loading = 'rejected';
    })
    .addCase(editProject.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(editProject.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.projects.push(action.payload);
      state.error = null
    })
    .addCase(editProject.rejected, (state, action) => {
      state.loading = 'rejected';
    })
      .addCase(fetchProject.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to fetch projects.';
      })
  },
});

export default projectsSlice.reducer;
// taskSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TasksApiResponse, TasksState } from '../../types/types';
import { fetchTasksForStartingArea } from './taskApi';
import { RootState } from '../../app/store';

const initialState: TasksState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchTasks = createAsyncThunk<TasksApiResponse, void, { state: RootState }>(
  'tasks/fetchTasks',
  async (_, { getState }) => {
    const state = getState();
    let startingAreaId = state.character.starting_area_id;
    let characterId = state.character.id;
    
    characterId = 1;  // Hardcoded for now
    startingAreaId = 2;  // Hardcoded for now

    if (!startingAreaId || !characterId) {
      throw new Error('Starting area or character not selected');
    }

    const response = await fetchTasksForStartingArea({ startingAreaId, characterId });
    console.log('Thunk Response:', response);  // Add this line
    return response;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log('Fulfilled Action Payload:', action.payload);  // Add this line
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.tasks || [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      });
  },
});

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTaskErrors = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResourceApiResponse, ResourceState } from '../../types/types';
import { fetchResourcesFromAPI } from './resourceApi';
import { RootState } from '../../app/store';

const initialState: ResourceState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchResources = createAsyncThunk<ResourceApiResponse, void, { state: RootState }>(
  'tasks/fetchTasks',
  async (_, { getState }) => {
    const state = getState();
    let startingAreaId = state.character.starting_area_id;
    let characterId = state.character.id;
    
    characterId = 1;  
    startingAreaId = 2;  

    if (!startingAreaId || !characterId) {
      throw new Error('Starting area or character not selected');
    }

    const response = await fetchResourcesFromAPI({ characterId });
    console.log('Thunk Response:', response);
    return response;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        console.log('Fulfilled Action Payload:', action.payload);
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.resources || [];
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      })
  },
});

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTaskErrors = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
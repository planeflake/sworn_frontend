import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStartingAreasFromApi } from './startingAreasApi';
import { createAsyncReducers } from '../../utils/asyncReducerUtils';
import { StartingArea } from '../../types/types';
import type { RootState } from '../../app/store';


interface StartingAreasState {
  items: StartingArea[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StartingAreasState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchStartingAreas = createAsyncThunk(
  'startingAreas/fetchStartingAreas',
  async () => {
    const response = await fetchStartingAreasFromApi();
    console.log('Starting Area Response: ', response);
    if (!response) {
      throw new Error('Failed to fetch starting areas');
    }
    return response as StartingArea[];
  }
);

export const startingAreasSlice = createSlice({
  name: 'startingAreas',
  initialState,
  reducers: {},
  extraReducers: (builder) => createAsyncReducers<StartingArea>(fetchStartingAreas)(builder)
});

export const selectStartingArea = (state: RootState) => state.startingAreas.items;
export const selectStartingAreaStatus = (state: RootState) => state.startingAreas.status;
export const selectStartingAreaError = (state: RootState) => state.startingAreas.error;

export default startingAreasSlice.reducer;
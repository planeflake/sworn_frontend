import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBaseCharacterInfoFromApi } from './BaseCharacterInfoApi';
import { Character } from '../../types/types';
import type { RootState } from '../../app/store';

// Define the initial state type for character
interface CharacterState {
  id: number;
  name?: string;
  description?: string;
  starting_area_id?: number;
  skills?: any[];
  current_area_id?: number | null;
  level?: number;
  xp?: number;
  energy?: number;
  resources?: any[];
  tasksCompleted?: number;
  tasksFailed?: number;
  items?: any[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const character_id = 1;

const initialState: CharacterState = {
  id: character_id, // Start with an empty ID
  status: 'idle',
  error: null,
};

// Fetch base character information thunk
export const fetchBaseCharacterInfo = createAsyncThunk(
  'character/fetchBaseCharacterInfo',
  async (character_id: number) => {
    const response = await fetchBaseCharacterInfoFromApi({character_id});
    if (!response) {
      throw new Error('Failed to fetch character info');
    }
    return response as Character;
  }
);

// Define the character slice
export const characterSlice = createSlice({
  name: 'characterInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaseCharacterInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBaseCharacterInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload); // Update state with fetched character info
      })
      .addCase(fetchBaseCharacterInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch character info';
      });
  },
});

// Selectors
export const selectCharacterInfo = (state: RootState) => state.character;
export const selectCharacterStatus = (state: RootState) => state.character.status;
export const selectCharacterError = (state: RootState) => state.character.error;

export default characterSlice.reducer;

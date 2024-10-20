import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CharacterResource } from '../../types/types';
import { fetchResourcesFromAPI } from './resourceApi';
import { RootState } from '../../app/store';

interface ResourcesState {
  items: CharacterResource[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ResourcesState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchResources = createAsyncThunk<CharacterResource[], void, { state: RootState }>(
  'resources/fetchResources',
  async (_, { getState }) => {
    const state = getState();
    const characterId = state.character.id;

    const response = await fetchResourcesFromAPI({ characterId });
    console.log('Thunk Response (Resources):', response);
    return response as CharacterResource[];
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action: PayloadAction<CharacterResource[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectResources = (state: RootState): CharacterResource[] => state.resources.items;
export const selectResourcesStatus = (state: RootState): string => state.resources.status;
export const selectResourcesError = (state: RootState): string | null => state.resources.error;

export default resourcesSlice.reducer;

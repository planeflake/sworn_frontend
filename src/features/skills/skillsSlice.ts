import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSkillsFromApi } from './skillsApi';
import { createAsyncReducers } from '../../utils/asyncReducerUtils';
//import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
//import { create } from 'domain';


interface Skill {
  id: number;
  name: string;
  description: string;
  category: string;
  parent_skill_id: number | null;
}

interface SkillsState {
  items: Skill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SkillsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = fetchSkillsFromApi();
  if (!response) {
    throw new Error('Failed to fetch skills');
  }
  return response as Promise<Skill[]>;
});

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => createAsyncReducers<Skill>(fetchSkills)(builder)});

export const selectSkills = (state: RootState) => state.skills.items;
export const selectSkillsStatus = (state: RootState) => state.skills.status;
export const selectSkillsError = (state: RootState) => state.skills.error;

export default skillsSlice.reducer;
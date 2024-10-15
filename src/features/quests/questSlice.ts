// redux/slices/questSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quest, Stage, Choice } from '../../types/types';

interface QuestState {
  quest: Quest | null;
  currentStage: Stage | null;
  outcome: string | null;
  stageIndex: number;
}

const initialState: QuestState = {
  quest: null,
  currentStage: null,
  outcome: null,
  stageIndex: 0,
};

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setQuest: (state, action: PayloadAction<Quest>) => {
      state.quest = action.payload;
      state.currentStage = action.payload.stages[0];
      state.stageIndex = 0;
      state.outcome = null;
    },
    nextStage: (state, action: PayloadAction<Stage>) => {
      state.currentStage = action.payload;
      state.stageIndex += 1;
    },
    setOutcome: (state, action: PayloadAction<string>) => {
      state.outcome = action.payload;
    },
    resetQuest: (state) => {
      state.quest = null;
      state.currentStage = null;
      state.outcome = null;
      state.stageIndex = 0;
    },
  },
});

export const { setQuest, nextStage, setOutcome, resetQuest } = questSlice.actions;

export default questSlice.reducer;

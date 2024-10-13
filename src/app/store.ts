import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '../features/skills/skillsSlice';
import startingAreasReducer from '../features/starting_areas/startingAreasSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    startingAreas: startingAreasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
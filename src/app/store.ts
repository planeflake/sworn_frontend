import componentVisibilityReducer from '../features/components/componentVisibilitySlice';
import startingAreasReducer from '../features/starting_areas/startingAreasSlice';
import CharacterReducer from '../features/character/characterSlice';
import skillsReducer from '../features/skills/skillsSlice';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import taskReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    startingAreas: startingAreasReducer,
    ui: uiReducer,
    componentVisibility: componentVisibilityReducer,
    character: CharacterReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Adjust this import path as needed

export interface ComponentVisibilityState {
  startingAreas: boolean;
  skills: boolean;
  inventory: boolean;
  map: boolean;
  tasks: boolean;
  // Add more components as needed
}

const initialState: ComponentVisibilityState = {
  startingAreas: true,
  skills: false,
  inventory: false,
  map: false,
  tasks: false,
  // Set initial visibility for other components
};

const componentVisibilitySlice = createSlice({
  name: 'componentVisibility',
  initialState,
  reducers: {
    toggleComponentVisibility: (state, action: PayloadAction<keyof ComponentVisibilityState>) => {
      state[action.payload] = !state[action.payload];
    },
    setComponentVisibility: (
      state,
      action: PayloadAction<{ component: keyof ComponentVisibilityState; isVisible: boolean }>
    ) => {
      state[action.payload.component] = action.payload.isVisible;
    },
  },
});

export const { toggleComponentVisibility, setComponentVisibility } = componentVisibilitySlice.actions;

export const selectComponentVisibility = (
    state: RootState, 
    component: keyof ComponentVisibilityState
  ): boolean => {
    return (state.componentVisibility as ComponentVisibilityState)[component];
  };

export default componentVisibilitySlice.reducer;
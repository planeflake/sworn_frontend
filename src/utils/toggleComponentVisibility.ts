// utils/toggleVisibility.ts
import { AppDispatch } from '../app/store';
import { toggleComponentVisibility } from '../features/components/componentVisibilitySlice';
import { ComponentVisibilityState } from '../types/types';
 
// A utility function to toggle visibility for any component
export const toggleVisibility = (dispatch: AppDispatch, component: keyof ComponentVisibilityState) => {
  dispatch(toggleComponentVisibility(component));
};


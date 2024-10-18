// utils/componentHandlers.ts
import { AppDispatch } from '../app/store';
import { setComponentVisibility } from '../features/components/componentVisibilitySlice';

export const handleStartingAreaClick = (
  areaId: number,
  dispatch: AppDispatch
) => {
  dispatch(setComponentVisibility({ component: 'startingAreas', isVisible: false }));
  dispatch(setComponentVisibility({ component: 'tasks', isVisible: true }));
  console.log(`Area ${areaId} clicked`);
  // You can dispatch more actions, like loading tasks for the selected area
};

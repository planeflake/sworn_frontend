// components/Setup.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { selectComponentVisibility } from '../features/components/componentVisibilitySlice';
import StartingAreas from './StartingAreas';
import Tasks from './Tasks';
import { handleStartingAreaClick } from '../utils/componentHandlers';
import { fetchBaseCharacterInfo } from '../features/character/characterSlice';

const Setup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isStartingAreasVisible = useSelector((state: RootState) =>
    selectComponentVisibility(state, 'startingAreas')
  );
  const isTasksAreaVisible = useSelector((state: RootState) =>
    selectComponentVisibility(state, 'tasks')
  );

  useEffect(() => {
    dispatch(fetchBaseCharacterInfo(1));
  }, [dispatch]);

  return (
    <div>
      {isStartingAreasVisible && (
        <StartingAreas onAreaClick={(areaId) => handleStartingAreaClick(areaId, dispatch)} />
      )}
      {isTasksAreaVisible && <Tasks selectedAreaId={1} />}
    </div>
  );
};

export default Setup;

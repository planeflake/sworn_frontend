// components/Setup.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { selectComponentVisibility } from '../features/components/componentVisibilitySlice';
import StartingAreas from './StartingAreas';
import Tasks from './Tasks';
import { handleStartingAreaClick } from '../utils/componentHandlers';

const Setup: React.FC = () => {
  const dispatch = useDispatch();
  const isStartingAreasVisible = useSelector((state: RootState) =>
    selectComponentVisibility(state, 'startingAreas')
  );
  const isTasksAreaVisible = useSelector((state: RootState) =>
    selectComponentVisibility(state, 'tasks')
  );

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

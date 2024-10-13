import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchStartingAreas, selectStartingArea, selectStartingAreaStatus } from '../features/starting_areas/startingAreasSlice';
import { StartingArea } from '../types/types';

const StartingAreas: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startingAreas = useSelector((state: RootState) => selectStartingArea(state));
  const startingAreasStatus = useSelector((state: RootState) => selectStartingAreaStatus(state));

  useEffect(() => {
    if (startingAreasStatus === 'idle') {
      dispatch(fetchStartingAreas());
    }
  }, [startingAreasStatus, dispatch]);

  if (startingAreasStatus === 'loading') {
    return <div>Loading starting areas...</div>;
  }

  if (startingAreasStatus === 'failed') {
    return <div>Error loading starting areas</div>;
  }

  return (
    <div>
      <h1>Starting Areas</h1>
      <ul>
        {startingAreas.map((area: StartingArea) => (
          <li key={area.id}>{area.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StartingAreas;
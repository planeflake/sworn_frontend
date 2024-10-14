import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../app/store';
import { fetchStartingAreas, selectStartingArea, selectStartingAreaStatus } from '../features/starting_areas/startingAreasSlice';
import { StartingArea as StartingAreaType } from '../types/types';
import StartingArea from './StartingArea';
import '../styles/StartingAreas.css';

interface StartingAreasProps {
  onAreaClick: (areaId: number) => void;
}

const StartingAreas: React.FC<StartingAreasProps> = ({ onAreaClick }) => {
  const { t } = useTranslation(['startingAreas', 'skills']);
  const dispatch = useDispatch<AppDispatch>();
  const startingAreas = useSelector((state: RootState) => selectStartingArea(state));
  const startingAreasStatus = useSelector((state: RootState) => selectStartingAreaStatus(state));
  const theme = useSelector((state: RootState) => state.ui.theme); 

  useEffect(() => {
    if (startingAreasStatus === 'idle') {
      dispatch(fetchStartingAreas());
    }
  }, [startingAreasStatus, dispatch]);

  if (startingAreasStatus === 'loading') {
    return <div className="loading">{t('skills.loading')}</div>;
  }

  if (startingAreasStatus === 'failed') {
    return <div className="error">{t('skills.error')}</div>;
  }

  return (
    <div className={`starting-areas-container ${theme}`}>
      <h1 className="starting-areas-title">{t('startingAreas.title')}</h1>
      <div className="starting-areas-grid">
        {startingAreas.map((area: StartingAreaType) => (
          <StartingArea 
            key={area.id} 
            area={area} 
            theme={theme} 
            onClick={() => onAreaClick(area.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default StartingAreas;
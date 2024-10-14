import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StartingArea as StartingAreaType, Skill } from '../types/types';
import '../styles/StartingArea.css';

interface StartingAreaProps {
  area: StartingAreaType;
  theme: 'light' | 'dark';
  onClick: () => void;
}

const StartingArea: React.FC<StartingAreaProps> = ({ area, theme, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation(['startingAreas', 'skills']);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getBackgroundImage = (areaKey: string) => {
    return `url('/images/${areaKey}.jpg')`;
  };

  const toCamelCase = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1).replace(/\s+/g, '');
  };

  const areaKey = area.name.toLowerCase().replace(/\s+/g, '');
  const formattedAreaKey = areaKey === 'under-dwelling' ? 'underDwelling' : areaKey;
  const backgroundImage = getBackgroundImage(formattedAreaKey);

  return (
    <div 
      className={`starting-area-card ${isFlipped ? 'flipped' : ''} ${theme}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front" style={{ backgroundImage }}>
          <h2 className="area-name">{t(`startingAreas.${formattedAreaKey}.name`)}</h2>
          <p className="area-short-desc">{t(`startingAreas.${formattedAreaKey}.description`)}</p>
        </div>
        <div className="card-back">
          <h2 className="area-name">{t(`startingAreas.${formattedAreaKey}.name`)}</h2>
          <p className="area-description">{t(`startingAreas.${formattedAreaKey}.description`)}</p>
          {area.skills && area.skills.length > 0 ? (
            <div className="area-skills">
              <h3>{t('skills:skills')}:</h3>
              <ul>
                {area.skills.map((skill: Skill) => (
                  <li key={skill.id}>{t(`skills:skillNames.${toCamelCase(skill.name)}`)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-skills">{t('skills.noSkills')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartingArea;
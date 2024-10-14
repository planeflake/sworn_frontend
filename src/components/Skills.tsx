import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchSkills, selectSkills, selectSkillsStatus } from '../features/skills/skillsSlice';
import { Skill } from '../types/types';
import { useTranslation } from 'react-i18next';

const Skills: React.FC = () => {
  const { t } = useTranslation('skills');
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => selectSkills(state));
  const skillsStatus = useSelector((state: RootState) => selectSkillsStatus(state));

  useEffect(() => {
    if (skillsStatus === 'idle') {
      dispatch(fetchSkills());
    }
  }, [skillsStatus, dispatch]);

  const getTranslatedSkillName = (skillName: string) => {
    const lowerCaseSkillName = skillName.toLowerCase();
    
    // Check if the skill name exists in skillNames
    if (t(`skillNames.${lowerCaseSkillName}`, { defaultValue: '' }) !== '') {
      return t(`skillNames.${lowerCaseSkillName}`);
    }
    
    // If not found in skillNames, check categories
    if (t(`categories.${lowerCaseSkillName}`, { defaultValue: '' }) !== '') {
      return t(`categories.${lowerCaseSkillName}`);
    }
    
    // If not found in either, return the original skill name
    return skillName;
  };

  if (skillsStatus === 'loading') {
    return <div>Loading skills...</div>;
  }

  if (skillsStatus === 'failed') {
    return <div>Error loading skills</div>;
  }

  return (
    <div>
      <h1>{t('skills')}</h1>
      <ul>
        {skills.map((skill: Skill) => (
          <li key={skill.id}>
            {getTranslatedSkillName(skill.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchSkills, selectSkills, selectSkillsStatus } from '../features/skills/skillsSlice';
import { Skill } from '../types/types';

const Skills: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => selectSkills(state));
  const skillsStatus = useSelector((state: RootState) => selectSkillsStatus(state));

  useEffect(() => {
    if (skillsStatus === 'idle') {
      dispatch(fetchSkills());
    }
  }, [skillsStatus, dispatch]);

  if (skillsStatus === 'loading') {
    return <div>Loading skills...</div>;
  }

  if (skillsStatus === 'failed') {
    return <div>Error loading skills</div>;
  }

  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skills.map((skill: Skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
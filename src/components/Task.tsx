import React from 'react';
import { Task as TaskType } from '../types/types';
import '../styles/task.css';

interface TaskProps {
  task: TaskType;
  theme: string;
}


const Task: React.FC<TaskProps> = ({ task, theme }) => {
  return (
      <div className={`task ${task.css_class}`} >
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Difficulty: {task.difficulty}</p>
      <p>XP Reward: {task.xp}</p>
      <p>Energy Required: {task.base_energy}</p>
      <p>Required Level: {task.level_required || 'None'}</p>
      <p>Skills:</p>
      <ul>
        {task.skills.map(skill => (
          <li key={skill.id}>
            {skill.name} (Required Level: {skill.required_skill_level || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
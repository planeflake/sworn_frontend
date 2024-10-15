import React from 'react';
import { Task as TaskType } from '../types/types';

interface TaskProps {
  task: TaskType;
  theme: string;
}

const TaskCard: React.FC<TaskProps> = ({ task, theme }) => {
  return (
    <div className={`task-container ${theme}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Difficulty: {task.difficulty}</p>
      <p>XP Reward: {task.xp}</p>
      <p>Energy Required: {task.base_energy}</p>
      {task.icon && <img src={task.icon} alt={task.name} />}
      <p>Required Level: {task.level_required || 'None'}</p>
      <p>Repeatable: {task.repeatable ? 'Yes' : 'No'}</p>
      <p>Skills:</p>
      <ul>
        {task.skills.map(skill => (
          <li key={skill.id}>
            {skill.name} (Required Level: {skill.required_skill_level || 'N/A'})
          </li>
        ))}
      </ul>
      <p>Has Required Energy: {task.has_energy ? 'Yes' : 'No'}</p>
      <p>Has Required Resources: {task.has_required_resources ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TaskCard;
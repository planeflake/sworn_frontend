import React from 'react';
import { TaskType } from '../types/types';
import { useTranslation } from 'react-i18next';
import '../styles/task.css';

interface TaskProps {
  task: TaskType;
  theme: string;
  onComplete: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, theme, onComplete }) => {
  const { t } = useTranslation(['tasks', 'common']);

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <div className={`task-card ${theme} ${task.css_class}`}>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      
      <div className="task-requirements">
      Requirements:

      <p>Energy Required: {task.base_energy}</p>
      {task.icon && <i className={`fas ${task.icon}`} aria-hidden="true"></i>}
      <p>Level: {task.level_required || 'None'}</p>
      <p>Skills:</p>
      <ul>
        {task.skills.map(skill => (
          <li key={skill.id}>
            {skill.name} {skill.character_skill_level}/ 
            {skill.required_skill_level || 'N/A'}
          </li>
        ))}
      </ul>
      </div>

      <div className="task-rewards">
      Rewards:

      <p>XP: {task.xp}</p>
      <p>Resources:</p>
      <ul>
      {task.resources.map((resource) => (
        <li key={resource.id}>
          {resource.resource_name}: {resource.character_quantity} / {resource.required_quantity}
        </li>
      ))}
  </ul>
      <p>Duration: {task.base_duration}</p>
      {task.skill_point_reward && <p>Skill Point Reward: {task.skill_point_reward}</p>}
      {task.level_difference && <p>Level Difference: {task.level_difference}</p>}

      </div>      
      <button 
        onClick={handleComplete}
        disabled={task.state.state !== 'available'}
      >
        {t('tasks:completeTask')}

      </button>
    </div>
  );
};

export default Task;
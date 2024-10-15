import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../app/store';
import { fetchTasks, selectTasks, selectTasksStatus } from '../features/tasks/taskSlice';
import { Task as TaskType } from '../types/types';
import Task from './Task';
import '../styles/tasks.css';

interface TasksProps {
   selectedAreaId: number;
}

const Tasks: React.FC<TasksProps> = ({ selectedAreaId }) => {
  const { t } = useTranslation(['tasks', 'common']);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => selectTasks(state));
  const tasksStatus = useSelector((state: RootState) => selectTasksStatus(state));
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    if (tasksStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [tasksStatus, dispatch, selectedAreaId]);

  if (tasksStatus === 'loading') {
    console.log("Loading tasks...");
    return <div className="loading">{t('common:loading')}</div>;
  }

  if (tasksStatus === 'failed') {
    console.log("Failed to load tasks...");
    return <div className="error">{t('common:error')}</div>;
  }

  if(tasksStatus === 'succeeded' && tasks.length === 0) {
    console.log(tasks);}

  if (!Array.isArray(tasks)) {
    console.error('Tasks is not an array:', tasks);
    return <div>Error: Tasks data is not in the expected format.</div>;
  }

  return (
    <div className={`tasks-container ${theme}`}>
      <h1 className="tasks-title">{t('tasks:title')}</h1>
      <div className="tasks-grid">
        {tasks.map((task: TaskType) => (
        <div className={`task-${task.state.state.replace('_','-')} ${task.state.value} `} key={task.id}>
          <Task
          key={task.id} 
          task={task} 
          theme={theme}
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
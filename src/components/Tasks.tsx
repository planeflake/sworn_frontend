import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../app/store';
import { fetchTasks, selectTasks, selectTasksStatus, completeTask } from '../features/tasks/taskSlice';
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

  const handleCompleteTask = useCallback((taskId: number) => {
    dispatch(completeTask(taskId))
      .then(() => {
        console.log('Task completed and tasks refreshed');
      })
      .catch((error) => {
        console.error('Failed to complete task:', error);
        // You might want to dispatch an action to show an error message to the user
      });
  }, [dispatch]);

  if (tasksStatus === 'loading') {
    return <div className="loading">{t('common:loading')}</div>;
  }

  if (tasksStatus === 'failed') {
    return <div className="error">{t('common:error')}</div>;
  }

  if (!Array.isArray(tasks)) {
    console.error('Tasks is not an array:', tasks);
    return <div className="error">{t('tasks:dataFormatError')}</div>;
  }

  if (tasks.length === 0) {
    return <div className="no-tasks">{t('tasks:noTasks')}</div>;
  }

  return (
    <div className={`tasks-container ${theme}`}>
      <h1 className="tasks-title">{t('tasks:title')}</h1>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <Task
            key={task.id} 
            task={task as any}  // Type assertion
            theme={theme}
            onComplete={handleCompleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
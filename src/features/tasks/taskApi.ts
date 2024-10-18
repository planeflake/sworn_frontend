import { TasksApiResponse } from '../../types/types';

interface FetchTasksParams {
  startingAreaId: number;
  characterId: number;
}

interface CompleteTaskParams {
  taskId: number;
  characterId: number;
}

export const fetchTasksForStartingArea = async ({ startingAreaId, characterId }: FetchTasksParams): Promise<TasksApiResponse> => {
  console.log('Fetching tasks for starting area:', startingAreaId, 'and character:', characterId);
  const response = await fetch(`http://localhost:5000/api/tasks/${startingAreaId}/character/${characterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  console.log('API Response:', data);
  return data;
};

export const completeTask = async ({ taskId, characterId }: CompleteTaskParams): Promise<void> => {
  console.log('Completing task:', taskId, 'for character:', characterId);
  const response = await fetch('http://localhost:5000/api/complete_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task_id: taskId,
      character_id: characterId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to complete task');
  }

  const data = await response.json();
  console.log('Task completion response:', data);
};
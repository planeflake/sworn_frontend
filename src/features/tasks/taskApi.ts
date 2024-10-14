// taskApi.ts

import { TasksApiResponse } from '../../types/types';

interface FetchTasksParams {
  startingAreaId: number;
  characterId: number;
}

export const fetchTasksForStartingArea = async ({ startingAreaId, characterId }: FetchTasksParams): Promise<TasksApiResponse> => {
  console.log('Fetching tasks for starting area:', startingAreaId, 'and character:', characterId);
  const response = await fetch(`http://localhost:5000/api/tasks/${startingAreaId}/character/${characterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  console.log('API Response:', data);  // Add this line
  return data;  // Return the data as-is for now
};
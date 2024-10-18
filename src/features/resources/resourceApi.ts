// resourceApi.ts
import { ResourceApiResponse } from '../../types/types';

export interface FetchResourcesParams {
  characterId: number;
}

export const fetchResourcesFromAPI = async ({ characterId }: FetchResourcesParams): Promise<ResourceApiResponse> => {
  console.log('Fetching resources for character:', characterId);
  const response = await fetch(`http://localhost:5000/api/resources/${characterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }
  const data = await response.json();
  console.log('API Response:', data);
  return data;
};

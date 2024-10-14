import { Character } from '../../types/types'

interface FetchBaseCharacterInfoProps {
    character_id: number;
  }
  
  export const fetchBaseCharacterInfoFromApi = async (
    { character_id }: FetchBaseCharacterInfoProps
  ): Promise<Character> => {
    const response = await fetch(`http://localhost:5000/api/character/${character_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch base character info');
    }
    return response.json();
  };
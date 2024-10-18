
interface Skill {
    id: number;
    name: string;
    description: string;
    category: string;
    parent_skill_id: number | null;
}

export const fetchSkillsFromApi = async (): Promise<Skill[]> => {    
    const response = await fetch('http://localhost:5000/api/skills');
    if (!response) {
        throw new Error('Failed to fetch skills');
    }
    return response.json() as Promise<Skill[]>;
}

interface IncreaseSkillParams {
    skillId: number;
    characterId: number;
    points: number; // New parameter for the skill level
  }
  

  
export  const increaseSkillToApi = async ({ skillId, characterId, points }: IncreaseSkillParams): Promise<void> => {
    const response = await fetch(`http://localhost:5000/character/skills/increase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        skill_id: skillId,
        character_id: characterId,
        points: points // Send the points to increase
      })
    });
  
    if (!response.ok) {
      throw new Error('Failed to increase skill');
    }
  };
  
  
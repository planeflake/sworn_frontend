
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
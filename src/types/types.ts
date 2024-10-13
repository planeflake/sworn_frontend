export interface Skill {
    id: number;
    name: string;
    description: string;
    category: string;
    parent_skill_id: number | null;
  }
  
  export interface StartingArea {
    id: number;
    name: string;
}

export interface StartingArea {
    id: number;
    name: string;
    description: string;
    parent_area_id: number | null;
  }

  export interface SkillsState {
    items: Skill[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
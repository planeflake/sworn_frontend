import { Resource } from "i18next";

export interface Character {
  id: number;
  name: string;
  description: string;
  starting_area_id: number;
  skills: Skill[];
  current_area_id: number | null;
  level: number;
  xp: number;
  energy: number;
  resources: Resource[];
  tasksCompleted: number;
  tasksFailed: number;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  description: string;
}

export interface TasksApiResponse {
  tasks: Task[];
}

export interface TasksState {
  items: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface TaskSkill {
  id: number;
  name: string;
  character_skill_level: number;
  required_skill_level: number | null;
  skill_level_difference: number | null;
}

// Interface for the task state
export interface TaskState {
  items:Task[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Interface for a single task
export interface Task {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  xp: number;
  icon: string | null;
  resources: Record<string, number>;  // Assuming it's a map of resource name -> quantity
  base_duration: number;
  base_energy: number;
  level_required: number | null;
  level_difference: number | null;
  repeatable: boolean;
  skill_point_reward: number | null;
  skills: TaskSkill[];  // Array of related skills
  has_energy: boolean;  // Whether the character has enough energy
  has_required_resources: boolean;  // Whether the character has the needed resources
  state: TaskState;  // Task state, which can be complex
}

export interface Skill {
  id: number;
  name: string;
  description: string;

}

export interface StartingArea {
    id: number;
    name: string;
    description: string;
    parent_area_id: number | null;
    skills: Skill[];
  }

  export interface SkillsState {
    items: Skill[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  export interface TaskProps {
    task: Task[];
    theme: string;
  }
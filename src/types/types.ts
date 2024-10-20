export interface Resource {
  id: number;
  resource_name: string;
  character_quantity: number;
  required_quantity: number;
}


export interface CharacterResource {
  resource_id: number;
  icon?: string;
  name: string;
  quantity: number;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  starting_area_id: number;
  skills: Skill[];
  current_area_id: number | null;
  level: number;
  health: number;
  max_health: number;
  xp: number;
  energy: number;
  resources: CharacterResource[];
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

export interface TaskAvailability {
  state: 'available' | 'unavailable' | 'close_level' | 'close_skill';
  value: number | null;
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
  state: TaskAvailability;  // Task state, which can be complex
  css_class:string;
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

export interface ComponentVisibilityState {
  startingAreas: boolean;
  skills: boolean;
  inventory: boolean;
  map: boolean;
  tasks: boolean;
  questModal: boolean;
}

// types.ts

export interface Choice {
  choice_id: number;
  text: string;
  outcome: {
    success: string;
    fail: string;
  };
  next_stage?: number;
  exit_point?: boolean;
  available?: boolean;
}

export interface Stage {
  stage_id: number;
  description: string;
  choices: Choice[];
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  stages: Stage[];
}

export interface CharacterSkill {
  skill_name: string;
  skill_level: number;
}

export interface SkillRequirement {
  [skillName: string]: number;
}

export interface TaskType {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  xp: number;
  base_energy: number;
  base_duration: number;
  icon: string;
  level_required: number | null;
  repeatable: boolean;
  has_energy: boolean;
  has_required_resources: boolean;
  level_difference: number;
  skill_point_reward: number | null;
  css_class: string;
  state: {
    state: string;
    value: number;
  };
  skills: {
    id: number;
    name: string;
    character_skill_level: number;
    required_skill_level: number | null;
    skill_level_difference: number | null;
  }[];
  resources: Resource[];
}


export interface ResourceApiResponse {
  resources: CharacterResource[];
}

// Interface for the task state
export interface ResourceState {
  items:Resource[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

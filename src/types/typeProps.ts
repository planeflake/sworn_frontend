import { CharacterSkill } from './types';

export interface QuestModalProps {
  questId: number;
  characterId: number;
  characterSkills: CharacterSkill[]; // Expecting character skills as part of props
  onClose: () => void;
}

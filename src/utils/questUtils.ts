import { Quest, Stage } from '../types/types';

 
  export const fetchQuest = async (questId: number): Promise<Quest> => {
    try {
      const response = await fetch(`/quest/${questId}`);
      const data: Quest = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quest:', error);
      throw new Error('Quest could not be fetched.');
    }
  };
  
  export const getNextStage = (
    quest: Quest,
    currentStageId: number
  ): Stage | null => {
    const nextStageIndex = quest.stages.findIndex(
      (stage) => stage.stage_id === currentStageId + 1
    );
    return nextStageIndex !== -1 ? quest.stages[nextStageIndex] : null;
  };
  
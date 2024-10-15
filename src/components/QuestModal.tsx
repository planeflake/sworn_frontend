// components/QuestModal.tsx
import React, { useState, useEffect } from 'react';
import { QuestModalProps } from '../types/typeProps';  // Importing props from typeProps file
import { Quest, Stage, Choice } from '../types/types';
import { fetchQuest, getNextStage } from '../utils/questUtils';
import { checkSkillRequirement } from '../utils/characterUtils';

const QuestModal: React.FC<QuestModalProps> = ({
  questId,
  characterId,
  characterSkills,
  onClose,
}) => {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [outcome, setOutcome] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestData(questId);
  }, [questId]);

  const fetchQuestData = async (questId: number) => {
    const questData = await fetchQuest(questId);
    setQuest(questData);
    setCurrentStage(questData.stages[0]);
  };

  const handleChoice = (choice: Choice) => {
    if (choice.exit_point) {
      onClose();
    } else {
      const nextStage = getNextStage(quest!, currentStage!.stage_id);
      if (nextStage) {
        setCurrentStage(nextStage);
      } else {
        setOutcome('End of quest.');
      }
    }
  };

  return (
    <div className="quest-modal">
      <div className="modal-content">
        {currentStage ? (
          <>
            <h2>{quest?.name}</h2>
            <p>{currentStage.description}</p>

            {outcome && <p>{outcome}</p>}

            <ul>
              {currentStage.choices.map((choice) => (
                <li key={choice.choice_id}>
                  <button onClick={() => handleChoice(choice)}>
                    {choice.text}
                  </button>
                </li>
              ))}
            </ul>

            <button onClick={onClose}>Close Quest</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default QuestModal;

// utils/characterUtils.ts

interface SkillRequirement {
    [skillName: string]: number;
  }
  
  interface CharacterSkill {
    skill_name: string;
    skill_level: number;
  }
  
  export const checkSkillRequirement = (
    characterSkills: CharacterSkill[],
    skillRequirement: SkillRequirement
  ): boolean => {
    return Object.keys(skillRequirement).every((skillName) => {
      const skill = characterSkills.find((s) => s.skill_name === skillName);
      return skill && skill.skill_level >= skillRequirement[skillName];
    });
  };
  
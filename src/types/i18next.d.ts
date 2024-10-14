import 'react-i18next';
import enSkills from '../locales/en/skills.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'skills';
    resources: {
      skills: typeof enSkills;
      startingAreas: typeof enStartingAreas;
    };
  }
}
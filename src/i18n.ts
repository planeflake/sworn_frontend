import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enSkills from './locales/en/skills.json';
import noSkills from './locales/no/skills.json';
import enStartingAreas from './locales/en/starting_areas.json'; // Importing startingAreas
import noStartingAreas from './locales/no/starting_areas.json'; // Importing startingAreas

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        skills: enSkills,
        startingAreas: enStartingAreas,  // Adding startingAreas namespace for English
      },
      no: {
        skills: noSkills,
        startingAreas: noStartingAreas,  // Adding startingAreas namespace for Norwegian
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['skills', 'startingAreas'],  // Add startingAreas to the namespaces list
    defaultNS: 'skills',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

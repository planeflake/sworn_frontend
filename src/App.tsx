import React from 'react';
import { I18nextProvider } from 'react-i18next';
import ThemeProvider from './Providers/ThemeProvider';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import Setup from './components/Setup';
import { MainBar } from './components/MainBar';
import i18n from './i18n';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <div className="App">
          <MainBar />
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Setup /> {/* The Setup component manages the app layout */}
        </div>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;

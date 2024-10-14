import { selectComponentVisibility,setComponentVisibility } from './features/components/componentVisibilitySlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import StartingAreas from './components/StartingAreas';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeProvider from './Providers/ThemeProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { I18nextProvider } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RootState } from './app/store';
import Tasks from './components/Tasks';
import React from 'react';
import i18n from './i18n';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isStartingAreasVisible = useSelector((state: RootState) => 
    selectComponentVisibility(state, 'startingAreas')
    );
  const isTasksAreaVisible = useSelector((state: RootState) =>
    selectComponentVisibility(state, 'tasks')
    );

    const handleStartingAreaClick = (areaId: number) => {
      dispatch(setComponentVisibility({ component: 'startingAreas', isVisible: false }));
      dispatch(setComponentVisibility({ component: 'tasks', isVisible: true }));
      console.log(`Area ${areaId} clicked`);
      // Here you might also want to dispatch an action to load tasks for the selected area
      // For example: dispatch(loadTasksForArea(areaId));
    };

  return (
    <ThemeProvider>
    <I18nextProvider i18n={i18n}>
    <div className="App">
      <h1>Welcome</h1>
      <LanguageSwitcher/>
      <ThemeSwitcher/>
      {isStartingAreasVisible && <StartingAreas onAreaClick={handleStartingAreaClick} />}
      {isTasksAreaVisible && <Tasks selectedAreaId={1} />}
    </div>
    </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
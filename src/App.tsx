import React from 'react';
import Skills from './components/Skills';
import StartingAreas from './components/StartingAreas';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <Skills />
      <StartingAreas />
    </div>
  );
};

export default App;
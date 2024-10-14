import React, { useEffect, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
import React, {FC} from 'react';
import {ThemeProvider} from 'styled-components';
import {mainTheme} from './theme/mainTheme';
import {MainNavigator} from './navigation';

export const App: FC = () => (
  <ThemeProvider theme={mainTheme}>
    <MainNavigator />
  </ThemeProvider>
);

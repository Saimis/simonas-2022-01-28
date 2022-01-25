import React, {FC} from 'react';
import {ThemeProvider} from 'styled-components';
import {mainTheme} from './theme/mainTheme';
import {MainNavigator} from './navigation';
import {store} from './store';
import {Provider} from 'react-redux';

export const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <MainNavigator />
    </ThemeProvider>
  </Provider>
);

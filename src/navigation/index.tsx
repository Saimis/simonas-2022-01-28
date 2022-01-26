import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {OrderbookStackNavigator} from './OrderbookStackNavigator';

export const MainNavigator = () => (
  <NavigationContainer>
    <OrderbookStackNavigator />
  </NavigationContainer>
);

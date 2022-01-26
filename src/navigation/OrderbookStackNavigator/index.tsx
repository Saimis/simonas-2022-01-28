import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Orderbook} from '../../screens/Orderbook';

type OrderbookStackParamsList = {
  Orderbook: undefined;
};

const OrderbookStack = createNativeStackNavigator<OrderbookStackParamsList>();

const screenOptions = {headerShown: false};

export const OrderbookStackNavigator: FC = () => (
  <OrderbookStack.Navigator screenOptions={screenOptions}>
    <OrderbookStack.Screen name="Orderbook" component={Orderbook} />
  </OrderbookStack.Navigator>
);

import React, {FC} from 'react';
import {List} from '../List';
import {orderBookSelector, PriceSide} from '~/store/slices/orderbook';
import {useAppSelector} from '~/store/hooks';

export const AsksList: FC = () => {
  const {asks} = useAppSelector(orderBookSelector);

  return <List items={asks} priceSide={PriceSide.ASK} />;
};

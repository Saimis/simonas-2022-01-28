import React, {FC} from 'react';
import {List} from '../List';
import {orderBookSelector, PriceSide} from '~/store/slices/orderbook';
import {useAppSelector} from '~/store/hooks';

export const BidsList: FC = () => {
  const {bids} = useAppSelector(orderBookSelector);

  return <List items={bids} priceSide={PriceSide.BID} />;
};

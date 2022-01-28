import React, {FC} from 'react';
import {List} from '../List';
import {
  orderBookSelector,
  PriceSide,
  PriceLevel,
} from '~/store/slices/orderbook';
import {useAppSelector} from '~/store/hooks';

export const BidsList: FC = () => {
  const {bids}: {bids: PriceLevel[]} = useAppSelector(orderBookSelector);

  return <List items={bids} priceSide={PriceSide.BID} testID="BidsList" />;
};

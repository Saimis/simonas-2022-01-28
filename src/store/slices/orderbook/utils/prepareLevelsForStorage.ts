import {orderAndCleanLevels} from './orderAndCleanLevels';
import {calculateTotals} from './calculateTotals';
import {PriceLevel, PriceSide} from '../types';

type Props = {
  asks: PriceLevel[];
  bids: PriceLevel[];
};

export const prepareLevelsForStorage = ({asks, bids}: Props) => {
  const orderedBids = orderAndCleanLevels({
    levels: bids,
    field: 'price',
  });

  const orderedAsks = orderAndCleanLevels({
    levels: asks,
    field: 'price',
  });

  return {
    asks: calculateTotals({
      records: orderedAsks,
      type: PriceSide.ASK,
    }),
    bids: calculateTotals({
      records: orderedBids,
      type: PriceSide.BID,
    }),
  };
};

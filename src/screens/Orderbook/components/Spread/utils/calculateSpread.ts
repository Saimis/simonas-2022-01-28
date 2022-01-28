import {PriceLevel} from '~/store/slices/orderbook';
import _ from 'lodash';

type Props = {
  bids: PriceLevel[];
  asks: PriceLevel[];
};

export const calculateSpread = ({bids, asks}: Props) => {
  const highestBid: PriceLevel | undefined = _.first(bids);
  const lowestAsk: PriceLevel | undefined = _.first(asks);

  if (!highestBid || !lowestAsk) {
    return {spreadPercentage: 0, spreadValue: 0};
  }

  const spreadValue = Math.abs(highestBid?.price - lowestAsk?.price);
  const spreadPercentage = (spreadValue / lowestAsk?.price) * 100;

  return {spreadPercentage, spreadValue};
};

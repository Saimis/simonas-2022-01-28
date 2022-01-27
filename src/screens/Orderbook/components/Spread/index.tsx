import React, {FC} from 'react';
import {Box} from '~/components/Box';
import {Text} from '~/components/Text';
import {orderBookSelector} from '~/store/slices/orderbook';
import {useAppSelector} from '~/store/hooks';
import _ from 'lodash';
import {RootState} from '~/store';
import {PriceLevel} from '~/store/slices/orderbook';

export const Spread: FC = () => {
  const {bids = [], asks = []} = useAppSelector((state: RootState) =>
    orderBookSelector(state, 1),
  );

  const highestBid: PriceLevel | undefined = _.first(bids);
  const lowestAsk: PriceLevel | undefined = _.first(asks);

  if (!highestBid || !lowestAsk) {
    return null;
  }

  const spreadValue = Math.abs(highestBid?.price - lowestAsk?.price);
  const spreadPercentage = (spreadValue / lowestAsk?.price) * 100;

  return (
    <Box paddingY={2} alignItems="center">
      <Text color="gray" fontWeight={500}>
        Spread: {_.round(spreadValue, 1).toFixed(1).toLocaleString()} (
        {spreadPercentage.toFixed(2)}%)
      </Text>
    </Box>
  );
};

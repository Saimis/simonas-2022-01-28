import _ from 'lodash';
import React, {FC, memo} from 'react';
import {Box} from '~/components/Box';
import {Text} from '~/components/Text';
import {PriceLevel, PriceSide} from '~/store/slices/orderbook';
import {BackgroundColor} from './BackgroundColor';

type Props = {
  priceLevel: PriceLevel;
  priceSide: PriceSide;
};

export const OrderbookListItem: FC<Props> = ({priceLevel, priceSide}) => {
  const {price = 0, size, total = 0} = priceLevel;
  const isBids = priceSide === PriceSide.BID;
  const textColor = isBids ? 'green' : 'red';

  return (
    <Box paddingY={1.5} testID="orderbookListItem">
      <BackgroundColor total={total} isBids={isBids} />
      <Box flexDirection="row" justifyContent="space-between" paddingX={6}>
        <Box flex={1} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700} color={textColor}>
            {price.toFixed(2).toLocaleString()}
          </Text>
        </Box>
        <Box flex={1} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700}>
            {size.toLocaleString()}
          </Text>
        </Box>
        <Box flex={1} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700}>
            {total.toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

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

export const OrderbookListItem: FC<Props> = memo(({priceLevel, priceSide}) => {
  const {price = 0, size, total} = priceLevel;
  const isBids = priceSide === PriceSide.BID;
  const textColor = isBids ? 'green' : 'red';

  return (
    <Box paddingY={1.5} testID="orderbook-list-item">
      <BackgroundColor total={total} isBids={isBids} />
      <Box flexDirection="row" justifyContent="space-between" paddingX={6}>
        <Box width={4 / 12} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700} color={textColor}>
            {price.toFixed(2).toLocaleString()}
          </Text>
        </Box>
        <Box width={3 / 12} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700}>
            {size.toLocaleString()}
          </Text>
        </Box>
        <Box width={3.5 / 12} justifyContent="flex-end">
          <Text textAlign="right" fontWeight={700}>
            {total.toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}, _.isEqual);

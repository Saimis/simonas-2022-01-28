import React, {FC} from 'react';
import {Box} from '~/components/Box';
import {orderBookSelector} from '~/store/slices/orderbook';
import {useAppSelector} from '~/store/hooks';

type Props = {
  total: number;
  isBids: boolean;
};

export const BackgroundColor: FC<Props> = ({total, isBids}) => {
  const {highestTotal} = useAppSelector(orderBookSelector);
  const graphColor = isBids ? 'green-800' : 'red-800';

  const graphWidth = total / highestTotal.total;

  if (!graphWidth) {
    return null;
  }

  return (
    <Box
      left={0}
      top={0}
      bottom={0}
      right={0}
      position="absolute"
      width={graphWidth}
      backgroundColor={graphColor}
      testID="orderbook-list-item-graph"
    />
  );
};

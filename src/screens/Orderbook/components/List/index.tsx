import React, {FC, useCallback} from 'react';
import {FlatList} from 'react-native';
import {PriceLevel, PriceSide} from '~/store/slices/orderbook';
import {OrderbookListItem} from './Item';

type Props = {
  items: PriceLevel[];
  priceSide: PriceSide;
  testID: string;
};

export const List: FC<Props> = ({items = [], priceSide, testID}) => {
  const renderItem = useCallback(
    ({item}) => <OrderbookListItem priceSide={priceSide} priceLevel={item} />,
    [priceSide],
  );

  return (
    <FlatList
      testID={testID}
      scrollEnabled={false}
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.price.toString()}
    />
  );
};

import React, {FC, useCallback} from 'react';
import {FlatList} from 'react-native';
import {PriceLevel, PriceSide} from '~/store/slices/orderbook';
import {OrderbookListItem} from './Item';

type Props = {
  items: PriceLevel[];
  priceSide: PriceSide;
};

export const List: FC<Props> = ({items = [], priceSide}) => {
  const renderItem = useCallback(
    ({item}) => <OrderbookListItem priceSide={priceSide} priceLevel={item} />,
    [priceSide],
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.price.toString()}
    />
  );
};

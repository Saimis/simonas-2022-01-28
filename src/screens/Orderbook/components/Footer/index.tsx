import React from 'react';
import {Box} from '~/components/Box';
import {Button} from '~/components/Button';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {
  subscribedToProduct,
  unsubscribedFromProduct,
} from '~/store/slices/orderbook';
import {ProductId} from '~/store/slices/orderbook';
import {RootState} from '~/store';

export const Footer = () => {
  const productId: ProductId = useAppSelector(
    (state: RootState) => state.orderbook.productId,
  );

  const dispatch = useAppDispatch();

  const toggleProduct = () => {
    const product =
      productId === ProductId.XBTUSD ? ProductId.ETHUSD : ProductId.XBTUSD;

    dispatch(unsubscribedFromProduct(productId));
    dispatch(subscribedToProduct(product));
  };

  return (
    <Box pb={2}>
      <Button onPress={toggleProduct}>Toggle Feed {productId}</Button>
    </Box>
  );
};

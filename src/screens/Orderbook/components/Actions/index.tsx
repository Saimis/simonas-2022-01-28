import React, {useState, useEffect} from 'react';
import {Box} from '~/components/Box';
import {Button} from '~/components/Button';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {
  subscribedToProduct,
  unsubscribedFromProduct,
  bookUpdated,
} from '~/store/slices/orderbook';
import {ProductId} from '~/store/slices/orderbook';
import {RootState} from '~/store';

export const Actions = () => {
  const dispatch = useAppDispatch();

  const productId: ProductId = useAppSelector(
    (state: RootState) => state.orderbook.productId,
  );

  const toggleProduct = async () => {
    const product =
      productId === ProductId.XBTUSD ? ProductId.ETHUSD : ProductId.XBTUSD;

    dispatch(unsubscribedFromProduct());
    dispatch(bookUpdated({asks: [], bids: [], product_id: product}));
    dispatch(subscribedToProduct(product));
  };

  return (
    <Box pb={2}>
      <Button onPress={toggleProduct} testID="FeedToggleButton">
        Toggle Feed
      </Button>
    </Box>
  );
};

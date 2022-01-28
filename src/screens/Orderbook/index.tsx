import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '~/store/hooks';
import {
  subscribedToProduct,
  connectionInitiated,
  connectionStatus,
  visibleItemsSet,
} from '~/store/slices/orderbook';
import {LayoutChangeEvent} from 'react-native';
import {Box} from '~/components/Box';
import {ScreenTemplate} from '~/components/ScreenTemplate';
import {Header} from './components/Header';
import {Spread} from './components/Spread';
import {BidsList} from './components/BidsList';
import {AsksList} from './components/AsksList';
import {Actions} from './components/Actions';
import {ResumeConnection} from './components/ResumeConnection';
import {ProductId} from '~/store/slices/orderbook/types';
import {useAppState} from './hooks/useAppState';

export const Orderbook = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(connectionStatus);

  useAppState();

  useEffect(() => {
    if (isConnected) {
      dispatch(subscribedToProduct(ProductId.XBTUSD));
    }
  }, [dispatch, isConnected]);

  useEffect(() => {
    dispatch(connectionInitiated());
  }, [dispatch]);

  const onContainerLayout = (event: LayoutChangeEvent) =>
    dispatch(visibleItemsSet(event.nativeEvent.layout.height));

  return (
    <ScreenTemplate backgroundColor="blue-900" title="Order Book">
      <Box flex={1} onLayout={onContainerLayout}>
        <Header />
        <AsksList />
        <Spread />
        <BidsList />
      </Box>
      <Actions />
      <ResumeConnection />
    </ScreenTemplate>
  );
};

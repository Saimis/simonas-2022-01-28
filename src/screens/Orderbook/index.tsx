import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '~/store/hooks';
import {
  subscribeToProduct,
  startConnecting,
  socketConnected,
} from '~/store/slices/orderbook';

export const Orderbook = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(socketConnected);

  useEffect(() => {
    if (isConnected) {
      dispatch(subscribeToProduct('PI_XBTUSD'));
    }
  }, [dispatch, isConnected]);

  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

  return null;
};

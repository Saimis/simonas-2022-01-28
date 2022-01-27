import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import type {RootState} from '../../';
import {ProductId, MessageQueue} from '../orderbook/types';
import {normalizeLevels} from './utils/normalizeLevels';
import {OrderbookState} from './types';
import {prepareLevelsForStorage} from './utils/prepareLevelsForStorage';
export * from './types';

const initialState: OrderbookState = {
  book: {asks: [], bids: []},
  productId: ProductId.XBTUSD,
  isConnected: false,
  isLoading: true,
  subscriptionPaused: false,
  visibleItems: 10,
};

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    snapshotUpdated: (state, action: PayloadAction<MessageQueue>) => {
      const {asks, bids} = normalizeLevels(action.payload);

      state.book = prepareLevelsForStorage({
        asks,
        bids,
      });
    },
    bookUpdated: (state, action: PayloadAction<MessageQueue>) => {
      const {asks, bids} = normalizeLevels(action.payload);

      const uniqueBids = _.uniqBy(bids, 'price');
      const uniqueAsks = _.uniqBy(asks, 'price');

      state.book = prepareLevelsForStorage({
        asks: uniqueAsks,
        bids: uniqueBids,
      });
    },
    subscriptionPaused: state => {
      state.subscriptionPaused = true;
    },
    connectionClosed: state => {
      state.isConnected = false;
    },
    connectionEstablished: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    subscribedToProduct: (state, action: PayloadAction<ProductId>) => {
      state.productId = action.payload;
      state.subscriptionPaused = false;
    },
    unsubscribedFromProduct: (state, action: PayloadAction<ProductId>) => {
      state.book = {asks: [], bids: []};
      state.productId = action.payload;
      state.subscriptionPaused = false;
    },
    visibleItemsSet: (state, action: PayloadAction<number>) => {
      state.visibleItems = action.payload * 0.01428571429;
    },
  },
});

export const connectionInitiated = createAction<undefined>(
  'orderbook/connectionInitiated',
);

export const {
  bookUpdated,
  subscriptionPaused,
  subscribedToProduct,
  unsubscribedFromProduct,
  snapshotUpdated,
  connectionEstablished,
  connectionClosed,
  visibleItemsSet,
} = orderbookSlice.actions;

export const connectionStatus = (state: RootState) =>
  state.orderbook.isConnected;

export const orderBookSelector = (
  state: RootState,
  limit: number = state.orderbook.visibleItems,
) => {
  const asks = _.takeRight(state.orderbook.book.asks, limit);
  const bids = _.take(state.orderbook.book.bids, limit);

  return {
    highestTotal: _.maxBy([...asks, ...bids], 'total'),
    asks: _.takeRight(state.orderbook.book.asks, limit),
    bids: _.take(state.orderbook.book.bids, limit),
  };
};

export const socketConnected = (state: RootState) =>
  state.orderbook.book.isConnected;

export const orderbookReducer = orderbookSlice.reducer;

import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import type {RootState} from '../../';
import {ProductId} from '../../middleware/orderbookSocketMiddleware';
import {normalizeLevels} from './utils/normalizeLevels';
import {orderAndCleanLevels} from './utils/orderAndCleanLevels';
import {calculateTotals} from './utils/calculateTotals';
import {MessageQueue} from '../../middleware/orderbookSocketMiddleware';

export type PriceLevel = {price: number; size: number; total?: number};

export enum PriceSide {
  BID = 'BID',
  ASK = 'ASK',
}

export type OrderbookState = {
  book: any;
  productId: ProductId;
  isConnected: boolean;
  isLoading: boolean;
  subscriptionPaused: boolean;
  visibleItems: number;
};

const initialState: OrderbookState = {
  book: {asks: [], bids: []},
  productId: ProductId.XBTUSD,
  isConnected: false,
  isLoading: true,
  subscriptionPaused: true,
  visibleItems: 10,
};

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    snapshotUpdated: (state, action: PayloadAction<MessageQueue>) => {
      const {asks, bids} = normalizeLevels(action.payload);

      const orderedAsks = orderAndCleanLevels({
        levels: asks,
        field: 'price',
      });

      const orderedBids = orderAndCleanLevels({
        levels: bids,
        field: 'price',
      });

      state.book = {
        asks: calculateTotals({
          records: orderedAsks,
          type: PriceSide.ASK,
        }),
        bids: calculateTotals({
          records: orderedBids,
          type: PriceSide.BID,
        }),
      };
    },
    bookUpdated: (state, action: PayloadAction<MessageQueue>) => {
      const {asks, bids} = normalizeLevels(action.payload);

      const uniqueBids = _.uniqBy(bids, 'price');

      const orderedBids = orderAndCleanLevels({
        levels: uniqueBids,
        field: 'price',
      });

      const uniqueAsks = _.uniqBy(asks, 'price');

      const orderedAsks = orderAndCleanLevels({
        levels: uniqueAsks,
        field: 'price',
      });

      state.book = {
        asks: calculateTotals({
          records: orderedAsks,
          type: PriceSide.ASK,
        }),
        bids: calculateTotals({
          records: orderedBids,
          type: PriceSide.BID,
        }),
      };
    },
    subcriptionPaused: state => {
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
  subcriptionPaused,
  subscribedToProduct,
  snapshotUpdated,
  connectionEstablished,
  connectionClosed,
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

import {configureStore} from '@reduxjs/toolkit';
import {orderbookReducer} from './slices/orderbook';
import {orderbookSocketMiddleware} from './middleware/orderbookSocketMiddleware';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([orderbookSocketMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

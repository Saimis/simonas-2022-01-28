import {throttle} from 'lodash';
import {MessageQueue} from '~/store/slices/orderbook';
import {MiddlewareAPI} from 'redux';

type Props = {
  getQueue: () => MessageQueue;
  store: MiddlewareAPI;
  bookUpdated: any;
};

export const throttledSetBook = throttle(
  ({getQueue, store, bookUpdated}: Props) => {
    const queue = getQueue();

    store.dispatch(bookUpdated(queue));
  },
  500,
  {trailing: false},
);

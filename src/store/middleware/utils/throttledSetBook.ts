import {throttle} from 'lodash';
import {MessageQueue} from '../orderbookSocketMiddleware';
import {MiddlewareAPI} from 'redux';

type Props = {
  data: MessageQueue;
  store: MiddlewareAPI;
  bookUpdated: any;
};

export const throttledSetBook = throttle(
  ({data, store, bookUpdated}: Props) => store.dispatch(bookUpdated(data)),
  500,
);

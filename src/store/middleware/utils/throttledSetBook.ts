import {Platform} from 'react-native';
import {throttle} from 'lodash';
import {MessageQueue} from '~/store/slices/orderbook';
import {MiddlewareAPI} from 'redux';

type Props = {
  getQueue: () => MessageQueue;
  store: MiddlewareAPI;
  bookUpdated: any;
};

const throttleLevel: number = Platform.select({
  android: () => {
    if (Platform.Version >= 29) {
      return 1500;
    } else if (Platform.Version <= 28 && Platform.Version <= 26) {
      return 2000;
    }

    return 3000;
  },
  ios: () => (Platform.Version < 15.2 ? 1000 : 500),
})();

export const throttledSetBook = throttle(
  ({getQueue, store, bookUpdated}: Props) => {
    const queue = getQueue();

    store.dispatch(bookUpdated(queue));
  },
  throttleLevel,
  {trailing: false},
);

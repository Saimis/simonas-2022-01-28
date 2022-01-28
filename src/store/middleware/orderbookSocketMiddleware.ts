import {Middleware} from 'redux';
import {
  connectionInitiated,
  connectionEstablished,
  bookUpdated,
  snapshotUpdated,
  subscriptionPaused,
  subscribedToProduct,
  unsubscribedFromProduct,
  connectionClosed,
} from '../slices/orderbook';
import {throttledSetBook} from './utils/throttledSetBook';
import {makeQueue} from './utils/makeQueue';
import {FeedType, Message, MessageQueue} from '../slices/orderbook/types';

export const orderbookSocketMiddleware: Middleware = store => {
  let socket: WebSocket;
  let messageQueue: MessageQueue = {asks: [], bids: []};

  return next => async action => {
    const isConnectionEstablished = store.getState().orderbook.isConnected;
    switch (true) {
      case connectionInitiated.match(action):
        socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

        socket.onopen = () => {
          store.dispatch(connectionEstablished(true));
        };

        socket.onmessage = ({data}) => {
          const dataJson: Message = JSON.parse(data);

          if (dataJson.feed === FeedType.DELTA) {
            messageQueue = makeQueue({
              dataJson,
              messageQueue,
            });

            throttledSetBook({data: messageQueue, store, bookUpdated});
          } else if (dataJson.feed === FeedType.SNAPSHOT) {
            const {asks, bids} = dataJson;
            store.dispatch(snapshotUpdated({asks, bids}));
          }
        };
        break;
      case subscriptionPaused.match(action):
        if (isConnectionEstablished && socket) {
          const productId = store.getState().orderbook.productId;

          socket.send(
            JSON.stringify({
              event: 'unsubscribe',
              feed: 'book_ui_1',
              product_ids: [productId],
            }),
          );
        }
        break;
      case unsubscribedFromProduct.match(action):
        if (isConnectionEstablished && socket) {
          socket.send(
            JSON.stringify({
              event: 'unsubscribe',
              feed: 'book_ui_1',
              product_ids: [store.getState().orderbook.productId],
            }),
          );

          messageQueue = {asks: [], bids: []};
        }
        break;
      case subscribedToProduct.match(action):
        if (isConnectionEstablished && socket) {
          messageQueue = {asks: [], bids: []};

          socket.send(
            JSON.stringify({
              event: 'subscribe',
              feed: 'book_ui_1',
              product_ids: [action.payload],
            }),
          );
        }
        break;
      case connectionClosed.match(action):
        socket.close();
        break;
    }

    next(action);
  };
};

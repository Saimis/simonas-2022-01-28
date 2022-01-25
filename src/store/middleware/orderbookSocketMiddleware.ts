import {Middleware} from 'redux';
import {
  connectionInitiated,
  connectionEstablished,
  bookUpdated,
  snapshotUpdated,
  subcriptionPaused,
  subscribedToProduct,
  connectionClosed,
} from '../slices/orderbook';
import {throttledSetBook} from './utils/throttledSetBook';
import {makeQueue} from './utils/makeQueue';

export enum FeedType {
  SNAPSHOT = 'book_ui_1_snapshot',
  DELTA = 'book_ui_1',
}

export enum ProductId {
  XBTUSD = 'PI_XBTUSD',
  ETHUSD = 'PI_ETHUSD',
}

export type Message = {
  feed: FeedType;
  product_id: ProductId;
  bids: [number, number][];
  asks: [number, number][];
};

export type MessageQueue = {
  asks: [number, number][];
  bids: [number, number][];
};

export const orderbookSocketMiddleware: Middleware = store => {
  let socket: WebSocket;
  let messageQueue: MessageQueue = {asks: [], bids: []};

  return next => action => {
    const isConnectionEstablished = store.getState().orderbook.isConnected;

    switch (action) {
      case action.match(connectionInitiated):
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
      case action.match(subcriptionPaused):
        if (isConnectionEstablished && socket) {
          const productId = store.getState().orderbook.productId;

          messageQueue = {asks: [], bids: []};

          socket.send(
            JSON.stringify({
              event: 'unsubscribe',
              feed: 'book_ui_1',
              product_ids: [productId],
            }),
          );
        }
        break;
      case action.match(subscribedToProduct):
        if (isConnectionEstablished && socket) {
          messageQueue = {asks: [], bids: []};

          store.dispatch(bookUpdated({asks: [], bids: []}));

          socket.send(
            JSON.stringify({
              event: 'subscribe',
              feed: 'book_ui_1',
              product_ids: [action.payload],
            }),
          );
        }
        break;
      case action.match(connectionClosed):
        socket.close();
        break;
      default:
        next(action);
    }
  };
};

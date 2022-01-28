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
  errorsReceived,
} from '../slices/orderbook';
import {throttledSetBook} from './utils/throttledSetBook';
import {makeQueue} from './utils/makeQueue';
import {FeedType, Message, MessageQueue} from '../slices/orderbook/types';

export const orderbookSocketMiddleware: Middleware = store => {
  let socket: WebSocket;
  let messageQueue: MessageQueue = {asks: [], bids: []};

  const getQueue = () => messageQueue;
  const setQueue = (newQueue: MessageQueue): void => {
    messageQueue = newQueue;
  };

  const throttledSetBookRef = throttledSetBook;

  return next => async action => {
    const isConnectionEstablished = store.getState().orderbook.isConnected;
    switch (true) {
      case connectionInitiated.match(action):
        socket = new WebSocket(process.env.CRYTPTOFACILITIES_URL);

        socket.onopen = () => {
          store.dispatch(connectionEstablished(true));
        };

        socket.onmessage = ({data}) => {
          const dataJson: Message = JSON.parse(data);
          if (dataJson.feed === FeedType.SNAPSHOT) {
            setQueue({asks: [], bids: []});

            const {asks, bids} = dataJson;
            store.dispatch(snapshotUpdated({asks, bids}));
          } else if (dataJson.feed === FeedType.DELTA) {
            makeQueue({
              setQueue,
              getQueue,
              dataJson,
            });

            throttledSetBookRef({getQueue, store, bookUpdated});
          }
        };

        socket.onerror = (error: WebSocketErrorEvent) => {
          try {
            store.dispatch(errorsReceived(error.message));
          } catch (e) {
            console.log(e);
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

          setQueue({asks: [], bids: []});
          throttledSetBookRef.cancel();
        }
        break;
      case subscribedToProduct.match(action):
        if (isConnectionEstablished && socket) {
          const productId = action.payload;

          setQueue({asks: [], bids: []});

          socket.send(
            JSON.stringify({
              event: 'subscribe',
              feed: 'book_ui_1',
              product_ids: [productId],
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

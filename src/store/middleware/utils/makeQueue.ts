import {MessageQueue} from '~/store/slices/orderbook';

export const makeQueue = ({
  setQueue,
  getQueue,
  dataJson,
}: {
  setQueue: (newQueue: MessageQueue) => void;
  getQueue: () => MessageQueue;
  dataJson: MessageQueue;
}) => {
  const {asks: queueAsks, bids: queueBids} = getQueue();

  const newQueue = {
    asks: [...(dataJson.asks === undefined ? [] : dataJson.asks), ...queueAsks],
    bids: [...(dataJson.bids === undefined ? [] : dataJson.bids), ...queueBids],
  };

  setQueue(newQueue);
};

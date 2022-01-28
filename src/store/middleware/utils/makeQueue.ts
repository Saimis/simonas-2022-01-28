import {MessageQueue} from '~/store/slices/orderbook';

export const makeQueue = ({
  dataJson,
  messageQueue,
}: {
  dataJson: MessageQueue;
  messageQueue: MessageQueue;
}) => {
  const {asks: queueAsks, bids: queueBids} = messageQueue;

  return {
    asks: [...(dataJson.asks === undefined ? [] : dataJson.asks), ...queueAsks],
    bids: [...(dataJson.bids === undefined ? [] : dataJson.bids), ...queueBids],
  };
};

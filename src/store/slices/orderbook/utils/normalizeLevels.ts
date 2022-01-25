type Props = {asks: [number, number][]; bids: [number, number][]};

export const normalizeLevels = (bookLevels: Props) => {
  const {asks = [], bids = []} = bookLevels;

  const normalizedAsks = asks.map(item => {
    const [price, size] = item;

    return {
      price,
      size,
    };
  });

  const normalizedBids = bids.map(item => {
    const [price, size] = item;

    return {
      price,
      size,
    };
  });

  return {
    asks: normalizedAsks,
    bids: normalizedBids,
  };
};

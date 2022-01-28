import {
  orderbookReducer,
  bookUpdated,
  subscriptionPaused,
  subscribedToProduct,
  snapshotUpdated,
  connectionEstablished,
  connectionClosed,
  visibleItemsSet,
  ProductId,
} from './';

const initialState = {
  book: {asks: [], bids: []},
  productId: ProductId.XBTUSD,
  isConnected: false,
  isLoading: true,
  subscriptionPaused: false,
  visibleItems: 10,
};

test('should return the initial state', () => {
  return expect(orderbookReducer(undefined, {})).toEqual(initialState);
});

test('should handle a snapshot being added', () => {
  const records: {asks: [number, number][]; bids: [number, number][]} = {
    asks: [
      [2410.1, 55419],
      [2410.15, 10000],
      [2410.25, 0],
      [2410.7, 0],
      [2410.75, 10000],
    ],
    bids: [
      [2409.7, 0],
      [2409.75, 0],
      [2409.8, 3966],
      [2409.95, 3022],
      [2410.05, 0],
      [2410.15, 10000],
    ],
  };

  expect(orderbookReducer(initialState, snapshotUpdated(records))).toEqual({
    book: {
      asks: [
        {price: 2410.75, size: 10000, total: 75419},
        {price: 2410.15, size: 10000, total: 65419},
        {price: 2410.1, size: 55419, total: 55419},
      ],
      bids: [
        {price: 2410.15, size: 10000, total: 10000},
        {price: 2409.95, size: 3022, total: 13022},
        {price: 2409.8, size: 3966, total: 16988},
      ],
    },
    productId: ProductId.XBTUSD,
    isConnected: false,
    isLoading: true,
    subscriptionPaused: false,
    visibleItems: 10,
  });
});

test('should handle a delta being added', () => {
  const records: {asks: [number, number][]; bids: [number, number][]} = {
    asks: [
      [2410.1, 100],
      [2410.15, 100],
      [2410.25, 0],
      [2410.7, 0],
      [2410.75, 200],
    ],
    bids: [
      [2409.75, 10],
      [2409.8, 100],
      [2409.95, 100],
      [2410.05, 50],
      [2410.15, 200],
    ],
  };

  const previousState = {
    ...initialState,
    book: {
      asks: [
        {price: 2410.75, size: 10000, total: 75419},
        {price: 2410.15, size: 10000, total: 65419},
        {price: 2410.1, size: 55419, total: 55419},
      ],
      bids: [
        {price: 2410.15, size: 10000, total: 10000},
        {price: 2409.95, size: 3022, total: 13022},
        {price: 2409.8, size: 3966, total: 16988},
      ],
    },
  };
  expect(orderbookReducer(previousState, bookUpdated(records))).toEqual({
    book: {
      asks: [
        {price: 2410.75, size: 200, total: 400},
        {price: 2410.15, size: 100, total: 200},
        {price: 2410.1, size: 100, total: 100},
      ],
      bids: [
        {price: 2410.15, size: 200, total: 200},
        {price: 2410.05, size: 50, total: 250},
        {price: 2409.95, size: 100, total: 350},
        {price: 2409.8, size: 100, total: 450},
        {price: 2409.75, size: 10, total: 460},
      ],
    },
    productId: ProductId.XBTUSD,
    isConnected: false,
    isLoading: true,
    subscriptionPaused: false,
    visibleItems: 10,
  });
});

it('should handle subscriptionPaused action correctly', () => {
  expect(orderbookReducer(initialState, subscriptionPaused())).toEqual({
    ...initialState,
    subscriptionPaused: true,
  });
});

it('should handle connectionClosed action correctly', () => {
  expect(orderbookReducer(initialState, connectionClosed())).toEqual({
    ...initialState,
    isConnected: false,
  });
});

it('should handle connectionEstablished action correctly', () => {
  expect(orderbookReducer(initialState, connectionEstablished(true))).toEqual({
    ...initialState,
    isConnected: true,
  });
});

it('should handle subscribedToProduct action correctly', () => {
  const productId = ProductId.ETHUSD;
  expect(orderbookReducer(initialState, subscribedToProduct(productId))).toEqual({
    ...initialState,
    productId: productId,
    subscriptionPaused: false,
  });
});

it('should handle visibleItemsSet action correctly', () => {
  expect(orderbookReducer(initialState, visibleItemsSet(560))).toEqual({
    ...initialState,
    visibleItems: 8,
  });
});
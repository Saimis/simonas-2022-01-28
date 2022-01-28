export enum ProductId {
  XBTUSD = 'PI_XBTUSD',
  ETHUSD = 'PI_ETHUSD',
}

export type PriceLevel = {price: number; size: number; total?: number};

export enum FeedType {
  SNAPSHOT = 'book_ui_1_snapshot',
  DELTA = 'book_ui_1',
}

export enum PriceSide {
  BID = 'BID',
  ASK = 'ASK',
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
export type OrderbookState = {
  book: {
    asks: PriceLevel[];
    bids: PriceLevel[];
  };
  productId: ProductId;
  isConnected: boolean;
  isLoading: boolean;
  subscriptionPaused: boolean;
  visibleItems: number;
};

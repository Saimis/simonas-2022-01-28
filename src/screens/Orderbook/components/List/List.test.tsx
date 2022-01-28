import 'react-native';
import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {List} from './';
import {PriceSide} from '~/store/slices/orderbook';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const props = {
  items: [
    {price: 100.5, size: 120, total: 120},
    {price: 101, size: 140, total: 260},
    {price: 101.5, size: 50, total: 310},
    {price: 102, size: 10, total: 320},
  ],
  priceSide: PriceSide.BID,
  testID: 'BidList',
};
let renderedList: RenderAPI;

beforeEach(() => {
  const initialState = {
    orderbook: {
      visibleItems: 2,
      book: {
        asks: [
          {price: 100.5, size: 120, total: 120},
          {price: 101, size: 140, total: 260},
          {price: 101.5, size: 50, total: 310},
          {price: 102, size: 10, total: 320},
        ],
        bids: [
          {price: 100.5, size: 120, total: 120},
          {price: 101, size: 140, total: 360},
          {price: 101.5, size: 50, total: 310},
          {price: 102, size: 10, total: 320},
        ],
      },
    },
  };

  const store = mockStore(initialState);

  renderedList = render(
    <Provider store={store}>
      <List {...props} />
    </Provider>,
  );
});

it('should render correct amount of items', () => {
  const {queryAllByTestId} = renderedList;
  const itemsFound = queryAllByTestId('orderbookListItem');

  expect(itemsFound).toHaveLength(props.items.length);
});

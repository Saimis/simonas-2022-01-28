import _ from 'lodash';
import {calculateTotals} from '../calculateTotals';
import {PriceSide} from '~/store/slices/orderbook';

const records = [
  {price: 1001, size: 50},
  {price: 1002, size: 100},
  {price: 1003, size: 1000},
  {price: 1004, size: 2500},
];

const expectedBidResult = [
  {price: 1001, size: 50, total: 50},
  {price: 1002, size: 100, total: 150},
  {price: 1003, size: 1000, total: 1150},
  {price: 1004, size: 2500, total: 3650},
];

const expectedAskesult = [
  {price: 1001, size: 50, total: 3650},
  {price: 1002, size: 100, total: 3600},
  {price: 1003, size: 1000, total: 3500},
  {price: 1004, size: 2500, total: 2500},
];

it('should correctly calculate totals for bids', () => {
  const result = calculateTotals({records: records, type: PriceSide.BID});
  expect(_.isEqual(result, expectedBidResult)).toBeTruthy();
});

it('should correctly calculate totals for asks', () => {
  const result = calculateTotals({records: records, type: PriceSide.ASK});
  expect(_.isEqual(result, expectedAskesult)).toBeTruthy();
});

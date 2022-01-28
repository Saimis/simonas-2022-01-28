import _ from 'lodash';
import {orderAndCleanLevels} from '../orderAndCleanLevels';

const records = {
  asks: [
    {price: 2410.25, size: 0},
    {price: 2410.75, size: 10000},
    {price: 2410.7, size: 0},
    {price: 2410.1, size: 55419},
    {price: 2410.15, size: 10000},
  ],
  bids: [
    {price: 2410.05, size: 0},
    {price: 2410.15, size: 10000},
    {price: 2409.8, size: 3966},
    {price: 2409.75, size: 0},
    {price: 2409.95, size: 3022},
    {price: 2409.7, size: 0},
  ],
};

const expectedAsksResult = [
  {price: 2410.75, size: 10000},
  {price: 2410.15, size: 10000},
  {price: 2410.1, size: 55419},
];

const expectedBidsResult = [
  {price: 2410.15, size: 10000},
  {price: 2409.95, size: 3022},
  {price: 2409.8, size: 3966},
];

it('should correctly order asks, removing zeroes', () => {
  const result = orderAndCleanLevels({levels: records.asks, field: 'price'});
  expect(_.isEqual(result, expectedAsksResult)).toBeTruthy();
});

it('should correctly order bids, removing zeroes', () => {
  const result = orderAndCleanLevels({levels: records.bids, field: 'price'});
  expect(_.isEqual(result, expectedBidsResult)).toBeTruthy();
});

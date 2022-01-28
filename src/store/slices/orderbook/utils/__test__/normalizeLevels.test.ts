import _ from 'lodash';
import {normalizeLevels} from '../normalizeLevels';

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

const expectedResult = {
  asks: [
    {price: 2410.1, size: 55419},
    {price: 2410.15, size: 10000},
    {price: 2410.25, size: 0},
    {price: 2410.7, size: 0},
    {price: 2410.75, size: 10000},
  ],
  bids: [
    {price: 2409.7, size: 0},
    {price: 2409.75, size: 0},
    {price: 2409.8, size: 3966},
    {price: 2409.95, size: 3022},
    {price: 2410.05, size: 0},
    {price: 2410.15, size: 10000},
  ],
};

it('should correctly normalize records', () => {
  const result = normalizeLevels(records);
  expect(_.isEqual(result, expectedResult)).toBeTruthy();
});

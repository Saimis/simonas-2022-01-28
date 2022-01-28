import _ from 'lodash';
import {calculateSpread} from './calculateSpread';

const records = {
  asks: [
    {price: 1020, size: 2500, total: 4100},
    {price: 1003, size: 1000, total: 1600},
    {price: 1002, size: 100, total: 600},
    {price: 1001, size: 500, total: 500},
  ],
  bids: [
    {price: 1004, size: 12300, total: 12300},
    {price: 1003, size: 1000, total: 13300},
    {price: 1002, size: 100, total: 13400},
    {price: 1001, size: 50, total: 13450},
  ],
};

const expectedResult = {spreadPercentage: 1.5686274509803921, spreadValue: 16};

it('should correctly calculate spred', () => {
  const result = calculateSpread(records);
  expect(_.isEqual(result, expectedResult)).toBeTruthy();
});

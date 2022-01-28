import _ from 'lodash';
import {prepareLevelsForStorage} from '../prepareLevelsForStorage';

const records = {
  asks: [
    {price: 1001, size: 50},
    {price: 1002, size: 100},
    {price: 1003, size: 1000},
    {price: 1004, size: 2500},
  ],
  bids: [
    {price: 1001, size: 50},
    {price: 1002, size: 100},
    {price: 1003, size: 1000},
    {price: 1004, size: 2500},
  ],
};

const expectedBidResult = {
  asks: [
    {price: 1004, size: 2500, total: 3650},
    {price: 1003, size: 1000, total: 1150},
    {price: 1002, size: 100, total: 150},
    {price: 1001, size: 50, total: 50},
  ],
  bids: [
    {price: 1004, size: 2500, total: 2500},
    {price: 1003, size: 1000, total: 3500},
    {price: 1002, size: 100, total: 3600},
    {price: 1001, size: 50, total: 3650},
  ],
};

it('should correctly order, calculate totals and return data prepared for storage', () => {
  const result = prepareLevelsForStorage({...records});
  expect(_.isEqual(result, expectedBidResult)).toBeTruthy();
});

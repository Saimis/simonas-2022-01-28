import {PriceSide, PriceLevel} from '../index';
import {take, takeRight, sumBy} from 'lodash';

type Params = {
  records: PriceLevel[];
  type: PriceSide;
};

export const calculateTotals = ({records, type}: Params) => {
  return records.map((item, index: number) => {
    const otherItems =
      type === PriceSide.BID
        ? take(records, index + 1)
        : takeRight(records, records.length - index);

    return {
      ...item,
      total: sumBy(otherItems, 'size'),
    };
  });
};

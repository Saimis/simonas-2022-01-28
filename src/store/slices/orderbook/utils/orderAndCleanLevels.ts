import _ from 'lodash';

enum Order {
  DESC = 'desc',
  ASC = 'asc',
}

type Params = {
  levels: {price: number; size: number}[];
  field: string;
  order?: Order;
};

export const orderAndCleanLevels = ({
  levels,
  field,
  order = Order.DESC,
}: Params) => {
  const orderedLevels = _.orderBy(
    levels.filter(level => level.size > 0),
    [field],
    [order],
  );

  return orderedLevels;
};

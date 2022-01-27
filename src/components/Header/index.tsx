import React, {FC} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';

type Props = {
  title?: string;
};

export const Header: FC<Props> = ({title}) => {
  if (!title) {
    return null;
  }

  return (
    <Box paddingX={2}>
      <Text fontSize="lg" fontWeight={700}>
        {title}
      </Text>
    </Box>
  );
};

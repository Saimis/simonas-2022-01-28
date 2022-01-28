import React, {FC} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';

type Props = {
  title?: string;
  color?: string;
};

export const Header: FC<Props> = ({title}) => {
  if (!title) {
    return null;
  }

  return (
    <Box paddingX={2} pb={2} testID="GenericHeader">
      <Text
        fontSize="xl"
        textAlign="left"
        pl={2}
        fontWeight={700}
        color="gray"
        testID="genericHeaderTitle">
        {title}
      </Text>
    </Box>
  );
};

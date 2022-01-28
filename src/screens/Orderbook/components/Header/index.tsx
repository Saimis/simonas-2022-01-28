import React from 'react';
import {Box} from '~/components/Box';
import {Text} from '~/components/Text';

export const Header = () => {
  return (
    <Box
      flexGrow={0}
      borderTopWidth={2}
      borderBottomWidth={1}
      marginX={-6}
      paddingX={6}
      borderStyle="solid"
      testID="OrderBookHeader"
      borderColor="gray">
      <Box
        paddingY={1}
        paddingX={2}
        flexDirection="row"
        justifyContent="space-between">
        <Box flex={1} justifyContent="flex-end">
          <Text
            textAlign="right"
            fontSize="lg"
            fontWeight={700}
            color="gray"
            textStyle="uppercase">
            Price
          </Text>
        </Box>
        <Box flex={1} justifyContent="flex-end">
          <Text textAlign="right" fontSize="lg" fontWeight={700} color="gray">
            Size
          </Text>
        </Box>
        <Box flex={1} justifyContent="flex-end" pr={5}>
          <Text textAlign="right" fontSize="lg" fontWeight={700} color="gray">
            Total
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

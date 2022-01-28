import React from 'react';
import {Box} from '~/components/Box';
import {Button} from '~/components/Button';
import {Text} from '~/components/Text';
import {useAppSelector, useAppDispatch} from '~/store/hooks';
import {subscribedToProduct} from '~/store/slices/orderbook';
import {RootState} from '~/store';

export const ResumeConnection = () => {
  const dispatch = useAppDispatch();

  const subscriptionPaused = useAppSelector(
    (state: RootState) => state.orderbook.subscriptionPaused,
  );
  const productId = useAppSelector(
    (state: RootState) => state.orderbook.productId,
  );

  if (!subscriptionPaused) {
    return null;
  }

  const onPress = () => dispatch(subscribedToProduct(productId));

  return (
    <Box
      top={0}
      left={0}
      right={0}
      bottom={0}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      backgroundColor="black-transparent-75"
      paddingX={16}>
      <Box
        bg="white"
        borderRadius="md"
        padding={10}
        testID="PausedSubscriptionModal">
        <Text
          marginBottom={3}
          color="gray"
          fontSize="sm"
          fontWeight={500}
          textAlign="center">
          Updates have been paused
        </Text>
        <Button onPress={onPress} testID="ResumSubscriptionButton">
          Resume
        </Button>
      </Box>
    </Box>
  );
};

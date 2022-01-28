import React, {FC} from 'react';
import {Box} from '~/components/Box';
import {Text} from '~/components/Text';
import {Button} from '~/components/Button';

type Props = {
  resolve: () => void;
  errorMessage?: string;
};

export const Error: FC<Props> = ({
  resolve,
  errorMessage = 'Something went wrong',
}) => {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      padding={10}
      right={0}
      justifyContent="center"
      backgroundColor="black-transparent-75"
      alignItems="center">
      <Box
        bg="white"
        borderRadius="md"
        padding={10}
        testID="PausedSubscriptionModal">
        <Text marginBottom={3} color="gray">
          {errorMessage}
        </Text>
        <Box alignItems="center">
          {resolve && <Button onPress={resolve}>Restart</Button>}
        </Box>
      </Box>
    </Box>
  );
};

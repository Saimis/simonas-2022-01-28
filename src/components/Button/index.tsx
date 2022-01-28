import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Box} from '../Box';
import {Text} from '../Text';

type Props = {
  onPress: () => void;
  isDisabled?: boolean;
  testID?: string;
};

const BoxButton = Box.withComponent(Pressable);

export const Button: FC<Props> = ({onPress, isDisabled, children, testID = 'genericButton'}) => {
  return (
    <BoxButton
      onPress={isDisabled ? undefined : onPress}
      alignItems="center"
      testID={testID}
      alignSelf="center">
      <Box backgroundColor="purple" borderRadius="md" paddingX={6} paddingY={2}>
        <Text fontWeight={700} testID={`${testID}-label`}>
          {children}
        </Text>
      </Box>
    </BoxButton>
  );
};

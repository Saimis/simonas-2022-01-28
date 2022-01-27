import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {Box} from '../Box';
import {Text} from '../Text';

type Props = {
  onPress: () => void;
  isDisabled?: boolean;
};

const BoxButton = Box.withComponent(Pressable);

export const Button: FC<Props> = ({onPress, isDisabled, children}) => {
  return (
    <BoxButton
      onPress={isDisabled ? undefined : onPress}
      testID="button"
      alignItems="center"
      alignSelf="center">
      <Box backgroundColor="purple" borderRadius="md" paddingX={6} paddingY={2}>
        <Text fontWeight={700}>{children}</Text>
      </Box>
    </BoxButton>
  );
};

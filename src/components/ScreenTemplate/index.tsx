import React, {FC} from 'react';
import styled from 'styled-components/native';
import {color, ColorProps, flexbox, FlexboxProps} from 'styled-system';
import {Header} from '../Header';

type StyledProps = ColorProps & FlexboxProps;

export const StyledSafeAreaView = styled.SafeAreaView<StyledProps>`
  ${color}
  ${flexbox}
`;

type Props = {
  backgroundColor?: string;
  padding?: number;
  title?: string;
};

export const ScreenTemplate: FC<Props> = ({
  backgroundColor = 'black',
  title,
  children,
}) => (
  <StyledSafeAreaView
    flex={1}
    backgroundColor={backgroundColor}
    testID="screenTemplate">
    <Header title={title} />
    {children}
  </StyledSafeAreaView>
);

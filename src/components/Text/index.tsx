import React, {FC} from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {fontWeight} from './utils/fontWeight';
import {MainTheme} from '~/theme/mainTheme';

import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  textStyle,
  TextStyleProps,
  typography,
  TypographyProps,
} from 'styled-system';

type StyledProps = ColorProps<MainTheme> &
  TypographyProps<MainTheme> &
  FontWeightProps<MainTheme> &
  SpaceProps<MainTheme> &
  TextAlignProps<MainTheme> &
  TextStyleProps<MainTheme> &
  FontSizeProps<MainTheme> &
  LineHeightProps<MainTheme>;

const StyledText = styled.Text<StyledProps>`
  ${color}
  ${typography}
  ${fontWeight}
  ${space}
  ${textAlign}
  ${lineHeight}
  ${textStyle}
  ${fontSize}
`;

type Props = {} & StyledProps & TextProps;

export const Text: FC<Props> = ({
  color: fontColor = 'white',
  fontSize: size,
  children,
  ...rest
}) => (
  <StyledText fontSize={size} color={fontColor} {...rest}>
    {children}
  </StyledText>
);

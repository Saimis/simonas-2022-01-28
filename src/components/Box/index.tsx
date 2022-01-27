import styled from 'styled-components/native';
import {
  background,
  BackgroundProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  BorderProps,
  border,
  position,
  PositionProps,
} from 'styled-system';
import {MainTheme} from '~/theme/mainTheme';

type Props = ColorProps<MainTheme> &
  FlexboxProps<MainTheme> &
  MarginProps<MainTheme> &
  LayoutProps<MainTheme> &
  SpaceProps<MainTheme> &
  BackgroundProps<MainTheme> &
  PaddingProps<MainTheme> &
  ColorProps<MainTheme> &
  BorderProps<MainTheme> &
  PositionProps;

export const Box = styled.View<Props>`
  ${color}
  ${background}
  ${space}
  ${padding}
  ${margin}
  ${flexbox}
  ${layout}
  ${position}
  ${border}
`;

export type BoxProps = Props;

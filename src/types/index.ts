import {ThemeValue as StyledThemeValue, ResponsiveValue} from 'styled-system';
import {mainTheme} from '../theme/mainTheme';

export type Theme = typeof mainTheme;
export type ThemeValue<T extends keyof Theme> = ResponsiveValue<
  StyledThemeValue<T, Theme>,
  Theme
>;

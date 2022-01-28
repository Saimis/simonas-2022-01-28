import {colors} from './colors';
import {space} from './space';

export const mainTheme = {
  colors,
  space,
  fontSizes: {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  lineHeights: {
    sm: 14 * 1.6,
    md: 16 * 1.6,
    lg: 18 * 1.6,
  },
  fontWeights: {
    400: 400,
    500: 500,
    700: 700,
  },
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 16,
    full: 9999,
  },
  borderWidths: {
    0: 0,
    1: 1,
    2: 2,
  },
};

export type MainTheme = typeof mainTheme;

import {system} from 'styled-system';
import {ThemeValue} from '~/types';

const fontWeight = system({
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights',
    transform: (value: ThemeValue<'fontWeights'>) => value?.toString(),
  },
});

export {fontWeight};

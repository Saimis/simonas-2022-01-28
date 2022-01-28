import 'react-native';
import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Header} from './';

const props = {
  title: 'Order book',
  color: 'pink',
};
let renderedTree: RenderAPI;

beforeEach(() => {
  renderedTree = render(<Header {...props} />);
});

test('examples of some things', async () => {
  const {getByTestId} = renderedTree;
  const title = 'Order book';
  expect(getByTestId('genericHeaderTitle').props.children).toBe(title);
});
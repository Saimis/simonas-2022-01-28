import 'react-native';
import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {ScreenTemplate} from './';

const props = {
  title: undefined,
};
let renderedTree: RenderAPI;

beforeEach(() => {
  renderedTree = render(<ScreenTemplate {...props} />);
});

test('should render screen template', () => {
  const {getByTestId} = renderedTree;
  const itemsFound = getByTestId('screenTemplate');

  expect(itemsFound).toBeTruthy();
});

test('should not render Header without title', () => {
  expect(renderedTree.queryByTestId(/genericHeaderTitle/i)).toBeNull();
});

test('should render Header when title is provided', () => {
  const updatedProps = {
    ...props,
    title: 'Order Book',
  };
  const {getAllByText} = render(<ScreenTemplate {...updatedProps} />);
  const itemsFound = getAllByText(updatedProps.title);

  expect(itemsFound).toHaveLength(1);
});
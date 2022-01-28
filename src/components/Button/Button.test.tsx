import 'react-native';
import React from 'react';
import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import {Button} from './';

const props = {
  onPress: jest.fn(),
  isDisabled: false,
  children: 'Toggle Feed',
};
let renderedTree: RenderAPI;

beforeEach(() => {
  props.onPress.mockClear();
  renderedTree = render(<Button {...props} />);
});

test('should render button', () => {
  const {getAllByText} = renderedTree;
  const itemsFound = getAllByText(props.children);

  expect(itemsFound).toHaveLength(1);
});

test('should fire onPress prop on click', () => {
  const {getByTestId} = renderedTree;
  const button = getByTestId('genericButton');
  fireEvent(button, 'press');

  expect(props.onPress).toHaveBeenCalledTimes(1);
});

it('should not fire onPress when disabled', () => {
  const updatedProps = {
    ...props,
    isDisabled: true,
  };
  const {getByTestId} = render(<Button {...updatedProps} />);
  const button = getByTestId('genericButton');
  fireEvent(button, 'press');

  expect(props.onPress).toHaveBeenCalledTimes(0);
});

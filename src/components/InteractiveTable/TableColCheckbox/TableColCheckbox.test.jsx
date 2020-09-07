import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableColCheckbox from './TableColCheckbox';
import Checkbox from '../Checkbox';

jest.mock('../DataTableContext', () => ({
  useTableContext: () => ({
    dispatch: jest.fn(),
    data: [],
  }),
}));

test('Table Col Checkbox', () => {
  const tree = renderer.create(<TableColCheckbox head />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(Checkbox).length).toEqual(1);
  expect(testInstance.props).toMatchObject({ head: true });
});

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableCellCheckbox from './TableCellCheckbox';
import Checkbox from '../Checkbox';

jest.mock('../DataTableContext', () => ({
  useTableContext: () => ({
    dispatch: jest.fn(),
    data: [],
  }),
}));

test('Table Cell Checkbox', () => {
  const row = { name: 'title' };

  const tree = renderer.create(<TableCellCheckbox
    name="Name"
    row={row}
    selected
  />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(Checkbox).length).toEqual(1);
  expect(testInstance.props).toMatchObject({ row: { name: 'title' } });
});

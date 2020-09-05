import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableCol from './TableCol';
import { ColumnSortable } from './styled';
import NativeSortIcon from '../icons/NativeSortIcon';

jest.mock('../DataTableContext', () => ({
  useTableContext: () => ({
    dispatch: jest.fn(),
    data: [],
    sortDirection: 'asc',
  }),
}));

test('Table Col', () => {
  const column = { id: 'name', label: 'Name' };

  const tree = renderer.create(<TableCol column={column} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(ColumnSortable).length).toEqual(1);
  expect(testInstance.findAllByType(NativeSortIcon).length).toEqual(0);
  expect(testInstance.props).toMatchObject({ column });
});

test('Table Col: Sortable', () => {
  const column = { id: 'name', label: 'Name', sortable: true };

  const tree = renderer.create(<TableCol column={column} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(ColumnSortable).length).toEqual(1);
  expect(testInstance.findAllByType(NativeSortIcon).length).toEqual(1);
  expect(testInstance.props).toMatchObject({ column });
});

test('Table Col: Without Label', () => {
  const column = { id: 'name', sortable: true };

  const tree = renderer.create(<TableCol column={column} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(ColumnSortable).length).toEqual(0);
  expect(testInstance.findAllByType(NativeSortIcon).length).toEqual(0);
  expect(testInstance.props).toMatchObject({ column });
});

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableRow from './TableRow';
import TableCell from '../TableCell';
import TableCellCheckbox from '../TableCellCheckbox';
import TableRowStyle from './styled';

jest.mock('../DataTableContext', () => ({
  useTableContext: () => ({
    dispatch: jest.fn(),
    data: [],
    sortDirection: 'asc',
  }),
}));

const props = {
  id: 'ID',
  keyField: 'title',
  columns: [{ id: 'title', label: 'Title' }],
  onRowClick: () => null,
  row: { title: 'Amazing', name: 'Also Amazing' },
  selectableRows: true,
  selected: true,
  selectableRowsHighlight: true,
  rowIndex: 5,
};

test('Table Row', () => {
  const tree = renderer.create(<TableRow {...props} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(TableCell).length).toEqual(1);
  expect(testInstance.findAllByType(TableCellCheckbox).length).toEqual(1);
  expect(testInstance.props).toMatchObject(props);
});

test('Table Row: Multiple Columns', () => {
  const updatedProps = {
    ...props,
    columns: [...props.columns, { id: 'name', label: 'Name' }],
  };

  const tree = renderer.create(<TableRow {...updatedProps} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(TableCell).length).toEqual(2);
  expect(testInstance.findAllByType(TableCellCheckbox).length).toEqual(1);
  expect(testInstance.props).toMatchObject(updatedProps);
});

test('Table Row: Row not selectable', () => {
  const updatedProps = {
    ...props,
    selectableRows: false,
  };

  const tree = renderer.create(<TableRow {...updatedProps} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(TableCell).length).toEqual(1);
  expect(testInstance.findAllByType(TableCellCheckbox).length).toEqual(0);
  expect(testInstance.props).toMatchObject(updatedProps);
});

test('Table Row: onRowClick', () => {
  const updatedProps = {
    ...props,
    onRowClick: jest.fn(() => 'row clicked'),
  };

  const tree = renderer.create(<TableRow {...updatedProps} />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(TableCell).length).toEqual(1);
  expect(testInstance.findAllByType(TableCellCheckbox).length).toEqual(1);
  expect(testInstance.findByType(TableRowStyle).props.onClick()).toBe('row clicked');
  expect(updatedProps.onRowClick).toHaveBeenCalled();
  expect(testInstance.props).toMatchObject(updatedProps);
});

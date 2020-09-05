import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableCell from './TableCell';

test('Table Cell', () => {
  const column = { id: 'name' };
  const row = { name: 'title' };

  const tree = renderer.create(<TableCell
    id="id"
    column={column}
    row={row}
  />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType('div').length).toEqual(1);
  expect(testInstance.props).toMatchObject({ id: 'id', column: { id: 'name' }, row: { name: 'title' } });
});

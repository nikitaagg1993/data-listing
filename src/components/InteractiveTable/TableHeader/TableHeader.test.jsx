import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import TableHeader from './TableHeader';
import { Title } from './styled';

jest.mock('../DataTableContext', () => ({
  useTableContext: () => ({
    dispatch: jest.fn(),
    data: [],
  }),
}));

test('Table Col Checkbox', () => {
  const tree = renderer.create(<TableHeader title="Title" />);
  const testInstance = tree.root;

  expect(tree.toJSON()).toMatchSnapshot();
  expect(testInstance.findAllByType(Title).length).toEqual(1);
  expect(testInstance.props).toMatchObject({ title: 'Title' });
});

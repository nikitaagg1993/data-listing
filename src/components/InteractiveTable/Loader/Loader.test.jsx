import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Loader from './Loader';

test('it works', () => {
  const tree = renderer.create(<Loader />).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from './Checkbox';

describe('Checkbox component', () => {
  it('renders appropriate markup', () => {
    const name = 'Test-Checkbox';
    const checkboxComp = shallow(
      <CheckBox
        checked
        name={name}
        onClick={() => null}
      />,
    );

    expect(checkboxComp.find('input').length).toEqual(1);
    expect(checkboxComp.find('input').prop('type')).toEqual('checkbox');
    expect(checkboxComp.find('input').prop('name')).toEqual(name);
    expect(checkboxComp.find('input').prop('checked')).toEqual(true);
    expect(checkboxComp.find('input').prop('onChange')()).toBeNull();
  });
});

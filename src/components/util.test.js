import {
  isEmpty,
  sort,
  getProperty,
  insertItem,
  removeItem,
  decorateColumns,
  getSortDirection,
  handleFunctionProps,
  isRowSelected,
} from '../util';

const row = Object.freeze({ id: 1, name: 'somename', properties: { nested: 'iamnesting', items: [{ id: 1, name: 'iamarrayname' }] } });

describe('isEmpty', () => {
  test('if the value is a number return false', () => {
    expect(isEmpty(1)).toBe(false);
  });

  test('if the value is a string return true', () => {
    expect(isEmpty('1')).toBe(false);
  });

  test('if the value is a 0 return false', () => {
    expect(isEmpty(0)).toBe(false);
  });

  test('if the value is an empty string return true', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('if the value is null return true', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('if the value is undefined return true', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
});

describe('sort', () => {
  test('built in sort when already sorted asc', () => {
    const rows = sort([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], 'name', 'asc');

    expect(rows[0].name).toEqual('anakin');
    expect(rows[rows.length - 1].name).toEqual('vadar');
  });

  test('built in sort when already sorted desc', () => {
    const rows = sort([{ name: 'vadar' }, { name: 'leia' }, { name: 'anakin' }], 'name', 'desc');

    expect(rows[0].name).toEqual('vadar');
    expect(rows[rows.length - 1].name).toEqual('anakin');
  });

  test('built in sort when desc', () => {
    const rows = sort([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], 'name', 'desc');

    expect(rows[0].name).toEqual('vadar');
    expect(rows[rows.length - 1].name).toEqual('anakin');
  });

  test('built in sort when asc', () => {
    const rows = sort([{ name: 'vadar' }, { name: 'leia' }, { name: 'anakin' }], 'name', 'asc');

    expect(rows[0].name).toEqual('anakin');
    expect(rows[rows.length - 1].name).toEqual('vadar');
  });

  test('built in sort when a value is not a string and asc', () => {
    const rows = sort([{ count: 20 }, { count: 10 }, { count: 1 }], 'count', 'asc');

    expect(rows[0].count).toEqual(1);
    expect(rows[rows.length - 1].count).toEqual(20);
  });

  test('built in sort when a value is not a string and desc', () => {
    const rows = sort([{ count: 1 }, { count: 10 }, { count: 20 }], 'count', 'desc');

    expect(rows[0].count).toEqual(20);
    expect(rows[rows.length - 1].count).toEqual(1);
  });

  test('built in sort nested keys', () => {
    const rows = sort([{ item: { name: 'anakin' } }, { item: { name: 'leia' } }, { item: { name: 'vadar' } }], 'item.name', 'desc');

    expect(rows[0].item.name).toEqual('vadar');
    expect(rows[rows.length - 1].item.name).toEqual('anakin');
  });

  test('should handle a null field and not sort', () => {
    const rows = sort([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], null, 'desc');

    expect(rows[0].name).toEqual('anakin');
    expect(rows[rows.length - 1].name).toEqual('vadar');
  });

  test('custom sort should be called', () => {
    const mockSort = jest.fn();

    sort([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], 'name', 'desc', mockSort);

    expect(mockSort).toBeCalledWith([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], 'name', 'desc');
  });

  test('should handle when field is empty', () => {
    const rows = sort([{ name: 'anakin' }, { name: 'leia' }, { name: 'vadar' }], undefined, 'asc');

    expect(rows[0].name).toEqual('anakin');
    expect(rows[rows.length - 1].name).toEqual('vadar');
  });
});

describe('getProperty', () => {
  test('getProperty return null if a selector is null or undefined', () => {
    const property = getProperty(row);

    expect(property).toEqual(null);
  });

  test('getProperty return a value when a string selector is passed', () => {
    const property = getProperty(row, 'name');

    expect(property).toEqual('somename');
  });

  test('getProperty should throw an error if the selector is not a string or function', () => {
    expect(() => getProperty(row, { data: 'incorrect' })).toThrow();
  });
});

describe('insertItem', () => {
  test('should return the correct array items', () => {
    const array = insertItem([{ name: 'foo' }], { name: 'bar' });

    expect(array).toEqual([{ name: 'bar' }, { name: 'foo' }]);
  });
});

describe('removeItem', () => {
  test('should return the correct array items', () => {
    const array = removeItem([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }], { id: 2, name: 'bar' }, 'id');

    expect(array).toEqual([{ id: 1, name: 'foo' }]);
  });

  test('should return the correct array items when no keyfield is provided', () => {
    const array = removeItem([{ name: 'foo' }, { name: 'bar' }], { name: 'bar' });

    expect(array).toEqual([{ name: 'foo' }]);
  });

  test('should fallback to referne check is the keyField is mismatched', () => {
    const array = removeItem([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }], { id: 2, name: 'bar' }, 'UUID');

    expect(array).toEqual([{ id: 1, name: 'foo' }]);
  });
});

describe('decorateColumns', () => {
  test('should decorate columms', () => {
    const array = decorateColumns([{ name: 'foo' }, { name: 'bar' }]);

    expect(array[0]).toHaveProperty('name');
    expect(array[1]).toHaveProperty('name');
  });
});

describe('getSortDirection', () => {
  test('should return asc if true', () => {
    const direction = getSortDirection(true);

    expect(direction).toBe('asc');
  });

  test('countIfOne should return desc if false', () => {
    const direction = getSortDirection();

    expect(direction).toBe('desc');
  });
});

describe('handleFunctionProps', () => {
  test('should resolve the property if it is a function with indeterminate = true', () => {
    const prop = handleFunctionProps({ fakeProp: (indeterminate) => (indeterminate ? 'yay' : 'nay') }, true);

    expect(prop).toEqual({ fakeProp: 'yay' });
  });

  test('should resolve the property if it is a function with indeterminate = false', () => {
    const prop = handleFunctionProps({ fakeProp: (indeterminate) => (indeterminate ? 'yay' : 'nay') }, false);

    expect(prop).toEqual({ fakeProp: 'nay' });
  });

  test('should not need to resolve the property if it is not a function', () => {
    const prop = handleFunctionProps({ fakeProp: 'haha' });

    expect(prop).toEqual({ fakeProp: 'haha' });
  });
});

describe('isRowSelected', () => {
  test('when there is a keyField in the data set', () => {
    const currentRow = { id: 2, name: 'vadar' };
    const selectedRows = [{ id: 1, name: 'luke' }, { id: 2, name: 'vadar' }];

    expect(isRowSelected(currentRow, selectedRows, 'id')).toBe(true);
  });

  test('when the keyField is missing in the data set', () => {
    const selectedRows = [{ name: 'luke' }, { name: 'vadar' }];
    const currentRow = selectedRows[1];

    expect(isRowSelected(currentRow, selectedRows, 'id')).toBe(true);
  });

  test('when the row is not selected', () => {
    const currentRow = { id: 3, name: 'leia' };
    const selectedRows = [{ id: 1, name: 'luke' }, { id: 2, name: 'vadar' }];

    expect(isRowSelected(currentRow, selectedRows, 'id')).toBe(false);
  });

  test('with default values', () => {
    expect(isRowSelected()).toBe(false);
  });
});

import shortid from 'shortid';
import orderBy from 'lodash.orderby';

export const isEmpty = (field = '') => typeof field === 'undefined' || field === null || field.length === 0;

export const sort = (rows, field = '', direction, sortFn) => {
  if (sortFn && typeof sortFn === 'function') {
    return sortFn(rows, field, direction);
  }

  return orderBy(rows, field, direction);
};

export const getProperty = (row, id) => {
  if (!id) {
    return null;
  }

  if (typeof id !== 'string') {
    throw new Error('id must be a . delimited string eg (my.property)');
  }

  return row[id];
};

export const insertItem = (array = [], item = {}, index = 0) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export const removeItem = (array = [], item = {}, keyField) => {
  const newArray = array.slice();

  if (item[keyField]) {
    newArray.splice(newArray.findIndex((a) => a[keyField] === item[keyField]), 1);
  } else {
    newArray.splice(newArray.findIndex((a) => a === item), 1);
  }

  return newArray;
};

// Make sure columns have unique id's
export const decorateColumns = (columns) => columns.map((column) => ({
  sid: shortid.generate(),
  ...column,
  sortable: column.sortable || undefined,
}));

export const getSortDirection = (direction) => (direction ? 'asc' : 'desc');

export const handleFunctionProps = (object, ...args) => {
  let newObject;

  Object.keys(object).map((o) => object[o]).forEach((value, index) => {
    const oldObject = object;

    if (typeof value === 'function') {
      newObject = { ...oldObject, [Object.keys(object)[index]]: value(...args) };
      delete oldObject[value];
    }
  });

  return newObject || object;
};

export const noop = () => null;

export const isRowSelected = (row = {}, selectedRows = [], keyField = 'id') => {
  if (row[keyField]) {
    return selectedRows.some((r) => r[keyField] === row[keyField]);
  }

  return selectedRows.some((r) => r === row);
};

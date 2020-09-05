import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from '../DataTableContext';
import Checkbox from '../Checkbox';
import TableCellCheckboxStyle from './styled';

const TableCellCheckbox = ({ name, row, selected }) => {
  const {
    dispatch,
    data,
    keyField,
  } = useTableContext();

  const handleOnRowSelected = useCallback(() => dispatch({
    type: 'SELECT_SINGLE_ROW',
    row,
    isSelected: selected,
    keyField,
    rowCount: data.length,
  }), [dispatch, row, selected, keyField, data.length]);

  return (
    <TableCellCheckboxStyle
      onClick={(e) => e.stopPropagation()}
      noPadding
    >
      <Checkbox
        name={name}
        checked={selected}
        aria-checked={selected}
        onClick={handleOnRowSelected}
      />
    </TableCellCheckboxStyle>
  );
};

TableCellCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.shape({}).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TableCellCheckbox;

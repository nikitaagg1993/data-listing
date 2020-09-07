import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from '../DataTableContext';

import Checkbox from '../Checkbox';
import TableColStyle from './styled';

const TableColCheckbox = ({ head }) => {
  const {
    dispatch,
    data,
    allSelected,
    keyField,
    mergeSelections,
  } = useTableContext();

  // The row count should subtrtact rows that are disabled
  const rowCount = data.length;

  const handleSelectAll = useCallback(() => dispatch({
    type: 'SELECT_ALL_ROWS',
    rows: data,
    rowCount,
    mergeSelections,
    keyField,
  }), [dispatch, keyField, mergeSelections, rowCount, data]);

  return (
    <TableColStyle
      head={head}
      noPadding
    >
      <Checkbox
        name="select-all-rows"
        onClick={handleSelectAll}
        checked={allSelected}
      />
    </TableColStyle>
  );
};

TableColCheckbox.propTypes = {
  head: PropTypes.bool,
};

TableColCheckbox.defaultProps = {
  head: true,
};
export default TableColCheckbox;

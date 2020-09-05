import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from '../DataTableContext';
import NativeSortIcon from '../icons/NativeSortIcon';
import TableColStyle, { ColumnSortable } from './styled';

const TableCol = ({
  column,
}) => {
  const {
    dispatch,
    sortColumn,
    sortDirection,
    selectableRowsVisibleOnly,
    persistSelectedOnSort,
  } = useTableContext();

  const handleSortChange = () => {
    if (column.sortable) {
      let direction = sortDirection;

      if (sortColumn === column.id) {
        direction = sortDirection === 'asc' ? 'desc' : 'asc';
      }

      dispatch({
        type: 'SORT_CHANGE',
        sortDirection: direction,
        sortColumn: column.id,
        selectedColumn: column,
        visibleOnly: selectableRowsVisibleOnly,
        persistSelectedOnSort,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSortChange();
    }
  };

  const renderNativeSortIcon = (sortActive) => (
    <NativeSortIcon
      column={column}
      sortActive={sortActive}
      sortDirection={sortDirection}
    />
  );

  const sortActive = column.sortable && sortColumn === column.id;
  const nativeSortIcon = column.sortable;

  return (
    <TableColStyle
      column={column} // required by Cell.js
      head
    >
      {column.label && (
        <ColumnSortable
          id={`column-${column.id}`}
          aria-pressed={sortActive}
          tabIndex={0}
          onClick={handleSortChange}
          onKeyPress={handleKeyPress}
          sortActive={sortActive}
          column={column}
        >
          <div>
            {column.label}
          </div>
          {nativeSortIcon && renderNativeSortIcon(sortActive)}
        </ColumnSortable>
      )}
    </TableColStyle>
  );
};

TableCol.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    sortable: PropTypes.bool,
    label: PropTypes.string,
    omit: PropTypes.bool,
    right: PropTypes.bool,
  }).isRequired,
};

export default TableCol;

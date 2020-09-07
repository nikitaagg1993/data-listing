import React from 'react';
import PropTypes from 'prop-types';
import TableRowStyle from './styled';
import TableCell from '../TableCell';
import TableCellCheckbox from '../TableCellCheckbox';

const TableRow = ({
  id,
  keyField,
  columns,
  onRowClick,
  row,
  selectableRows,
  selected,
  selectableRowsHighlight,
  rowIndex,
}) => {
  const hightlightSelected = selectableRowsHighlight && selected;
  return (
    <>
      <TableRowStyle
        id={`row-${id}`}
        selected={hightlightSelected}
        onClick={() => onRowClick(row)}
      >
        {selectableRows && (
          <TableCellCheckbox
            name={`select-row-${row[keyField]}`}
            row={row}
            selected={selected}
          />
        )}

        {columns.map((column) => (
          <TableCell
            id={`cell-${row[keyField]}`}
            key={`cell-${Math.random()}-${row[keyField]}`}
            column={column}
            row={row}
            rowIndex={rowIndex}
          />
        ))}
      </TableRowStyle>
    </>
  );
};

TableRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any.isRequired,
  keyField: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  row: PropTypes.shape({}).isRequired,
  rowIndex: PropTypes.number.isRequired,
  selectableRows: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  selectableRowsHighlight: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default TableRow;

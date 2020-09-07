import React from 'react';
import PropTypes from 'prop-types';
import TableCellStyle from './styled';
import { getProperty } from '../../../util';

const TableCell = ({
  id,
  column,
  row,
}) => (
  <TableCellStyle
    id={id}
    column={column}
  >
    {getProperty(row, column.id)}
  </TableCellStyle>
);

TableCell.propTypes = {
  id: PropTypes.string.isRequired,
  column: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  row: PropTypes.shape({}).isRequired,
};

export default TableCell;

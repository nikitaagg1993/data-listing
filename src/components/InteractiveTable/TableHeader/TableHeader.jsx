import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderStyle, { Title } from './styled';
// import ContextMenu from './ContextMenu';

const TableHeader = ({ title }) => (
  <TableHeaderStyle>
    <Title>
      {title}
    </Title>
  </TableHeaderStyle>
);

TableHeader.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default TableHeader;

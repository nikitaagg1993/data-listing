import styled from 'styled-components';
import { Cell } from '../TableCell/styled';

const TableColStyle = styled(Cell)`
  ${(props) => props.column.button && 'text-align: center'};
`;

export const ColumnSortable = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
  line-height: 1;
  user-select: none;
  ${(props) => (props.theme.headCells && (props.sortActive ? props.theme.headCells.activeSortStyle : props.theme.headCells.inactiveSortStyle))};

  &:hover {
    ${({ column }) => column.sortable && 'cursor: pointer'};
    ${({ column, theme }) => column.sortable && theme.headCells && theme.headCells.activeStyle};

    span {
      ${({ sortActive, column }) => !sortActive && column.sortable && 'opacity: 1'};
    }
  }
`;

export default TableColStyle;

import styled, { css } from 'styled-components';
// import { Cell } from './Cell';
import { media } from '../../shared/media';

const overflowCSS = css`
  div:first-child {
    white-space: ${(props) => (props.column.wrap ? 'normal' : 'nowrap')};
    overflow: ${(props) => (props.column.allowOverflow ? 'visible' : 'hidden')};
    text-overflow: ellipsis;
  }
`;

export const CellBase = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  line-height: normal;
  ${({ theme, head }) => theme && theme[head ? 'headCells' : 'cells'] && theme[head ? 'headCells' : 'cells'].style};
  ${(props) => props.noPadding && 'padding: 0'};
`;

// Flex calculations
export const Cell = styled(CellBase)`
 

  ${(props) => props.column.width && css`
     width: ${props.column.width};
  `};

  ${(props) => !props.column.width && css`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
  `};

  ${(props) => props.column.numeric && css`
    justify-content: flex-end;
  `};
  ${(props) => props.column.right && 'justify-content: flex-end'};
  ${(props) => (props.column.center || props.column.button) && 'justify-content: center'};
  ${(props) => (props.column.compact || props.column.button) && 'padding: 0'};

  /* handle hiding cells */
  ${(props) => props.column.hide && props.column.hide === 'sm' && media.sm`
    display: none;
  `};
  ${(props) => props.column.hide && props.column.hide === 'md' && media.md`
    display: none;
  `};
  ${(props) => props.column.hide && props.column.hide === 'lg' && media.lg`
    display: none;
  `};
  ${(props) => props.column.hide && Number.isInteger(props.column.hide) && media.custom(props.column.hide)`
    display: none;
  `};
`;

const TableCellStyle = styled(Cell)`
  font-size: ${(props) => props.theme.rows && props.theme.rows.fontSize};
  font-weight: 400;
  ${(props) => !props.column.cell && overflowCSS};
  ${(props) => props.column.style};
  ${(props) => props.extendedCellStyle};
`;

export default TableCellStyle;

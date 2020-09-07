import styled from 'styled-components';

const TableRowStyle = styled.div`
  display: flex;
  align-items: stretch;
  align-content: stretch;
  width: 100%;
  box-sizing: border-box;
  ${(props) => props.theme.rows && props.theme.rows.style};
  ${(props) => props.theme.rows && props.selected && props.theme.rows.selectedHighlightStyle};
  ${(props) => props.extendedRowStyle};
`;

export default TableRowStyle;

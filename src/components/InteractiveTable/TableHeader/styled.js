import styled from 'styled-components';

const TableHeaderStyle = styled.header`
  position: relative;
  box-sizing: border-box;
  overflow: visible;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  ${(props) => props.theme.heade && props.theme.header.style}
`;

export const Title = styled.div`
  flex: 1 0 auto;
  color: ${(props) => props.theme.header && props.theme.header.fontColor};
  font-size: ${(props) => props.theme.header && props.theme.header.fontSize};
  font-weight: 400;
  text-align: center;
`;

export default TableHeaderStyle;

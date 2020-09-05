import styled, { css } from 'styled-components';

const disabled = css`
  pointer-events: none;
  opacity: 0.4;
`;

const TableStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 100%;
  ${(props) => props.disabled && disabled};
  ${(props) => props.theme.table.style};
`;

export const ResponsiveWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: inherit;
  ${(props) => props.responsive && css`
    overflow-x: auto;

    // prevents vertical scrolling in firefox
    overflow-y: hidden;
    min-height: 0;
  `};
  ${(props) => props.overflowY && props.responsive && props.overflowYOffset && css`
    padding-bottom: ${props.overflowYOffset};
    margin-bottom: -${props.overflowYOffset};
  `};
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  ${({
    fixedHeader, hasOffset, offset, fixedHeaderScrollHeight,
  }) => fixedHeader && css`
    max-height: ${hasOffset ? `calc(${fixedHeaderScrollHeight} - ${offset})` : fixedHeaderScrollHeight};
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  `};
`;

export const TableHead = styled.div`
  display: flex;
  ${(props) => props.theme.head.style};
`;

const disabledTableHeadRow = css`
  pointer-events: none;
`;

export const TableHeadRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  ${(props) => props.theme.headRow.style};
  ${(props) => props.disabled && disabledTableHeadRow};
`;

export const TableWrapper = styled.div`
  position: relative;
  width: 95%;
  border-style: groove;
  border-width: 5px;
  margin: 10px;
  padding: 10px;
  align-self: center;
  border-color: lightgray;
  ${(props) => props.theme.tableWrapper.style};
`;

export default TableStyle;

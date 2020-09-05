import React from 'react';
import styled from 'styled-components';

const NoDataWrapperStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  ${(props) => props.theme.noData.style};
`;

const NoDataWrapper = () => (
  <NoDataWrapperStyle>
    <div style={{ padding: '24px' }}>There are no records to display</div>
  </NoDataWrapperStyle>
);

export default NoDataWrapper;

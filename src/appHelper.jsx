import React from 'react';
import styled from 'styled-components';

export const columns = [
  {
    id: 'id',
    label: 'ID',
    numeric: true,
    sortable: true,
    width: '70px',
  },
  {
    id: 'title',
    label: 'Title',
    width: '500px',
    sortable: true,
  },
  {
    id: 'url',
    label: 'URL',
    sortable: true,
    width: '350px',
  },
  {
    id: 'thumbnailUrl',
    label: 'Thumbnail URL',
  },
];

const ThumbanailImg = styled.img`
  height: 50px;
  width: 50px
`;

const displayThumbnail = (name) => <ThumbanailImg src={name} alt={name} />;

export default displayThumbnail;

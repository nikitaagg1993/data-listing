/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { DataTableProvider } from '../DataTableContext';
import { tableReducer } from '../../reducer/tableReducer';

import TableRow from '../TableRow';
import TableCol from '../TableCol';
import TableHeader from '../TableHeader';
import Loader from '../Loader';
import NoData from './NoDataWrapper';
import TableColCheckbox from '../TableColCheckbox';
import { propTypes, defaultProps } from './propTypes';
import {
  isEmpty, sort, decorateColumns, getSortDirection, isRowSelected,
} from '../../../util';
import TableStyle, {
  ResponsiveWrapper, TableBody, TableHead, TableHeadRow, TableWrapper,
} from './styled';
import { createStyles } from './theme';

const InteractiveTable = ({
  data,
  columns,
  title,
  keyField,
  selectableRows,
  selectableRowsHighlight,
  selectableRowSelected,
  className,
  style,
  responsive,
  overflowY,
  overflowYOffset,
  isLoading,
  isLoadingMore,
  disabled,
  fixedHeader,
  fixedHeaderScrollHeight,
  sortIcon,
  defaultSortField,
  defaultSortAsc,
  clearSelectedRows,
  theme,
  onRowClick,
}) => {
  const initialState = {
    allSelected: false,
    selectedCount: 0,
    selectedRows: [],
    sortColumn: defaultSortField,
    selectedColumn: {},
    sortDirection: getSortDirection(defaultSortAsc),
  };

  const [{
    selectedRows,
    allSelected,
    selectedCount,
    sortColumn,
    sortDirection,
  }, dispatch] = useReducer(tableReducer, initialState);

  const columnsConfig = decorateColumns(columns);

  const currentTheme = () => createStyles(theme);

  useEffect(() => {
    dispatch({ type: 'CLEAR_SELECTED_ROWS', selectedRowsFlag: clearSelectedRows });
  }, [clearSelectedRows]);

  const sortingColumns = () => sort(data, sortColumn, sortDirection);

  const sortedData = sortingColumns();

  const init = {
    dispatch,
    data,
    allSelected,
    selectedRows,
    selectedCount,
    sortColumn,
    sortDirection,
    keyField,
    selectableRowSelected,
  };

  const showTableHead = () => data.length > 0 && !isLoading;

  return (
    <ThemeProvider theme={currentTheme}>
      <DataTableProvider initialState={init}>
        <ResponsiveWrapper
          responsive={responsive}
          className={className}
          style={style}
          overflowYOffset={overflowYOffset}
          overflowY={overflowY}
        >
          {title && <TableHeader title={title} />}

          <TableWrapper>

            <TableStyle disabled={disabled}>
              {showTableHead() && (
                <TableHead>
                  <TableHeadRow
                    disabled={isLoading || data.length === 0}
                  >
                    {selectableRows && <TableColCheckbox />}
                    {columnsConfig.map((column) => (
                      <TableCol
                        key={`col-${Math.random()}`}
                        column={column}
                        sortIcon={sortIcon}
                      />
                    ))}
                  </TableHeadRow>
                </TableHead>
              )}

              {!data.length > 0 && !isLoading && (
                <NoData />
              )}

              {isLoading && (
                <Loader />
              )}

              {!isLoading && data.length > 0 && (
                <TableBody
                  fixedHeader={fixedHeader}
                  fixedHeaderScrollHeight={fixedHeaderScrollHeight}
                  hasOffset={overflowY}
                  id="tablebody"
                  offset={overflowYOffset}
                >
                  {sortedData.map((row, i) => {
                    const id = isEmpty(row[keyField]) ? i : row[keyField];
                    const selected = isRowSelected(row, selectedRows, keyField);

                    return (
                      <TableRow
                        id={id}
                        key={id}
                        keyField={keyField}
                        row={row}
                        columns={columnsConfig}
                        selectableRows={selectableRows}
                        selected={selected}
                        selectableRowsHighlight={selectableRowsHighlight}
                        rowIndex={i}
                        onRowClick={onRowClick}
                      />
                    );
                  })}
                </TableBody>
              )}
              {isLoadingMore && (
              <Loader />
              )}
            </TableStyle>
          </TableWrapper>
        </ResponsiveWrapper>
      </DataTableProvider>
    </ThemeProvider>
  );
};

InteractiveTable.propTypes = propTypes;
InteractiveTable.defaultProps = defaultProps;

export default InteractiveTable;

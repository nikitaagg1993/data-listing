import { insertItem, isRowSelected, removeItem } from '../../util';

// eslint-disable-next-line import/prefer-default-export
export function tableReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ALL_ROWS': {
      const {
        rows, rowCount, mergeSelections, keyField,
      } = action;
      const allChecked = !state.allSelected;

      if (mergeSelections) {
        const selections = allChecked
          ? [
            ...state.selectedRows,
            ...rows.filter((row) => !isRowSelected(row, state.selectedRows, keyField)),
          ]
          : state.selectedRows.filter((row) => !isRowSelected(row, rows, keyField));

        return {
          ...state,
          allSelected: allChecked,
          selectedCount: selections.length,
          selectedRows: selections,
        };
      }

      return {
        ...state,
        allSelected: allChecked,
        selectedCount: allChecked ? rowCount : 0,
        selectedRows: allChecked ? rows : [],
      };
    }

    case 'SELECT_SINGLE_ROW': {
      const {
        row, isSelected, keyField, rowCount,
      } = action;

      if (isSelected) {
        return {
          ...state,
          selectedCount: state.selectedRows.length > 0 ? state.selectedRows.length - 1 : 0,
          allSelected: false,
          selectedRows: removeItem(state.selectedRows, row, keyField),
        };
      }

      return {
        ...state,
        selectedCount: state.selectedRows.length + 1,
        allSelected: state.selectedRows.length + 1 === rowCount,
        selectedRows: insertItem(state.selectedRows, row),
      };
    }

    case 'SORT_CHANGE': {
      const {
        sortColumn, sortDirection, selectedColumn, visibleOnly, persistSelectedOnSort,
      } = action;
      const clearSelectedOnSort = (!persistSelectedOnSort) || visibleOnly;

      return {
        ...state,
        sortColumn,
        selectedColumn,
        sortDirection,
        currentPage: 1,
        ...clearSelectedOnSort && ({
          allSelected: false,
          selectedCount: 0,
          selectedRows: [],
        }),
      };
    }

    case 'CLEAR_SELECTED_ROWS': {
      const { selectedRowsFlag } = action;

      return {
        ...state,
        allSelected: false,
        selectedCount: 0,
        selectedRows: [],
        selectedRowsFlag,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

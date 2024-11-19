import { SxProps, Theme } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';

import { TableColumn } from '../../interfaces/PrimaryTable';
import { createObjectFromKey, getValueForKey } from '../objectUtils';

export const getTableCellStyle =
  <T>(column: Column<T>, table: Table<T>, type: 'header' | 'row', top = 0): SxProps<Theme> =>
  () => {
    const { columnPinning } = table.getState();
    const leftVisibleColumns = table.getLeftVisibleLeafColumns();
    const rightVisibleColumns = table.getRightVisibleLeafColumns();

    const defaultHeaderStyle: SxProps<Theme> = {
      position: 'sticky',
      top,
      zIndex: 3,
    };
    const defaultRowStyle: SxProps<Theme> = {
      position: 'relative',
      py: 1,
    };

    if (column.getIsPinned()) {
      const leftIndex = (columnPinning.left ?? []).indexOf(column.id);
      if (leftIndex !== -1) {
        const left = leftVisibleColumns.slice(0, leftIndex).reduce((acc, col) => acc + col.getSize(), 0);

        switch (type) {
          case 'header':
            return {
              ...defaultHeaderStyle,
              left,
              zIndex: 4,
            };
          case 'row':
            return {
              ...defaultRowStyle,
              position: 'sticky',
              left,
              zIndex: 2,
            };
        }
      }

      const rightIndex = (columnPinning.right ?? []).indexOf(column.id);
      if (rightIndex !== -1) {
        const right = rightVisibleColumns
          .slice(rightIndex + 1, rightVisibleColumns.length)
          .reduce((acc, col) => acc + col.getSize(), 0);

        switch (type) {
          case 'header':
            return {
              ...defaultHeaderStyle,
              right,
              zIndex: 4,
            };
          case 'row':
            return {
              ...defaultRowStyle,
              position: 'sticky',
              right,
              zIndex: 2,
            };
        }
      }
    }

    switch (type) {
      case 'header':
        return defaultHeaderStyle;
      case 'row':
        return defaultRowStyle;
    }
  };

export const getTableRowValue = <T>(columnId: string, columns: TableColumn<T>[], row: T, index: number) => {
  const column = columns.find(({ id }) => id === columnId);
  if (!column) {
    return undefined;
  }
  return column.getRowValue?.(row, index) ?? getValueForKey(columnId, row);
};

export const getTableRangeFilter = (key: string, value: unknown, separator = '.') =>
  Array.isArray(value) && (!!value[0] || !!value[1])
    ? createObjectFromKey(
        key,
        {
          ...(value[0]
            ? {
                gte: value[0] as unknown,
              }
            : {}),
          ...(value[1]
            ? {
                lte: value[1] as unknown,
              }
            : {}),
        },
        separator,
      )
    : {};

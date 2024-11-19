import { KeyboardArrowDown } from '@mui/icons-material';
import { Grid2, Stack, TableCell, TableSortLabel } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { CheckboxField } from '../../../Fields/Checkbox/Checkbox';
import { TableHeaderCellProps } from './HeaderCell.types';

const TableHeaderCell = <T,>({ checkbox, color = 'primary', header, sx }: TableHeaderCellProps<T>) => {
  const label = useMemo(() => {
    switch (header.id) {
      case 'select':
        return <CheckboxField sx={{ m: '-9px' }} {...checkbox} />;
      case 'actions':
        return flexRender(header.column.columnDef.header, header.getContext());
      default: {
        const { getCanSelect } = header.column.columnDef.meta ?? {};
        return (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {getCanSelect?.(0) && <CheckboxField sx={{ m: '-9px 0 -9px -9px !important' }} {...checkbox} />}
            <TableSortLabel
              active={header.column.getIsSorted() !== false}
              onClick={header.column.getToggleSortingHandler()}
              direction={header.column.getIsSorted() || 'desc'}
              disabled={!header.column.getCanSort()}
              IconComponent={(props) => <KeyboardArrowDown {...props} sx={{ fontSize: '1.5rem !important' }} />}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableSortLabel>
          </Stack>
        );
      }
    }
  }, [checkbox, header]);

  const resizeHandle = useMemo(() => {
    if (['select', 'actions'].includes(header.id)) {
      return <></>;
    }

    return (
      <Grid2
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        sx={(theme) => ({
          backgroundColor: theme.palette.divider,
          cursor: 'col-resize',
          height: 24,
          margin: '0 7px',
          position: 'absolute',
          right: '-8px',
          top: 'calc(50% - 12px)',
          touchAction: 'none',
          userSelect: 'none',
          width: 2,
        })}
      />
    );
  }, [header]);

  return (
    <TableCell
      className={color}
      colSpan={header.colSpan}
      sx={sx}
      style={{
        minWidth: header.getSize(),
        ...(header.column.getIsPinned() ? { width: header.getSize() } : {}),
      }}
    >
      {!header.isPlaceholder && label}
      {header.column.getCanResize() && resizeHandle}
    </TableCell>
  );
};

const memoized = memo(TableHeaderCell, isEqual) as typeof TableHeaderCell;
export { memoized as TableHeaderCell };

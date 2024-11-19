import { Box, Toolbar } from '@mui/material';
import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { TablePaginationToolbar } from '../Pagination/Pagination';
import { ToolbarActions } from './Actions/Actions';
import { ToolbarColumnVisibility } from './ColumnVisibility/ColumnVisibility';
import { ToolbarRowExpandCollapse } from './RowExpandCollapse/RowExpandCollapse';
import { ToolbarRowSelection } from './RowSelection/RowSelection';
import { ToolbarSearch } from './Search/Search';
import { TableToolbarProps } from './Toolbar.types';

const TableToolbar = <T,>({
  actionsProps,
  columnVisibilityProps,
  paginationProps,
  rowExpandCollapseProps,
  rowSelectionProps,
  searchProps,
}: TableToolbarProps<T>) => {
  const gridTemplateAreas = useMemo(() => {
    const firstRow = [searchProps ? 'search' : null, actionsProps ? 'actions' : null].filter((it) => !!it);
    const secondRow = [
      rowExpandCollapseProps || rowSelectionProps ? 'selection' : null,
      paginationProps || columnVisibilityProps ? 'pagination' : null,
    ].filter((it) => !!it);

    if (firstRow.length === 0 && secondRow.length === 0) return {};

    if (firstRow.length === 1 && firstRow[0] === 'search' && secondRow.length === 1 && secondRow[0] === 'pagination') {
      return {
        default: '"search pagination"',
        reduced: '"search" "pagination"',
      };
    }

    return {
      default: [
        firstRow.length !== 0
          ? firstRow.length === 1 && secondRow.length === 2
            ? `"${firstRow[0]} ${firstRow[0]}"`
            : `"${firstRow.join(' ')}"`
          : null,
        secondRow.length !== 0
          ? secondRow.length === 1 && firstRow.length === 2
            ? `"${secondRow[0]} ${secondRow[0]}"`
            : `"${secondRow.join(' ')}"`
          : null,
      ]
        .filter((it) => !!it)
        .join(' '),
      reduced: [...firstRow, ...secondRow].map((it) => `"${it}"`).join(' '),
    };
  }, [actionsProps, columnVisibilityProps, paginationProps, rowExpandCollapseProps, rowSelectionProps, searchProps]);

  if (
    !actionsProps &&
    !columnVisibilityProps &&
    !paginationProps &&
    !rowExpandCollapseProps &&
    !rowSelectionProps &&
    !searchProps
  )
    return <></>;

  return (
    <Toolbar
      sx={[
        (theme) => ({
          pt: 0,
          pb: 1,
          px: '0 !important',
          display: 'grid',
          rowGap: 4,
          columnGap: 2,
          minHeight: '0 !important',
          width: '100%',
          gridTemplateAreas: gridTemplateAreas.default,
          [theme.breakpoints.down('lg')]: {
            gridTemplateAreas: gridTemplateAreas.reduced,
            rowGap: 1,
          },
        }),
      ]}
    >
      {searchProps && (
        <Box sx={{ gridArea: 'search' }}>
          <ToolbarSearch
            {...searchProps}
            hasMultilineToolbar={
              !!rowSelectionProps || !!rowExpandCollapseProps || (!!actionsProps && !!paginationProps)
            }
          />
        </Box>
      )}
      {actionsProps && (
        <Box
          sx={(theme) => ({
            gridArea: 'actions',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              overflowX: 'auto',
            },
          })}
        >
          <ToolbarActions {...actionsProps} />
        </Box>
      )}
      {(rowExpandCollapseProps || (rowSelectionProps && rowSelectionProps.selectedRows.length !== 0)) && (
        <Box
          sx={(theme) => ({
            gridArea: 'selection',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          })}
        >
          {rowExpandCollapseProps && <ToolbarRowExpandCollapse {...rowExpandCollapseProps} />}
          {rowSelectionProps && rowSelectionProps.selectedRows.length !== 0 && (
            <ToolbarRowSelection {...rowSelectionProps} />
          )}
        </Box>
      )}
      {(columnVisibilityProps || paginationProps) && (
        <Box
          sx={(theme) => ({
            gridArea: 'pagination',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            py: '3px',
            [theme.breakpoints.down('sm')]: {
              alignItems: 'flex-end',
              gap: 1,
              flexDirection: 'column',
            },
          })}
        >
          {columnVisibilityProps && <ToolbarColumnVisibility {...columnVisibilityProps} />}
          {paginationProps && <TablePaginationToolbar {...paginationProps} />}
        </Box>
      )}
    </Toolbar>
  );
};

const memoized = memo(TableToolbar, isEqual) as typeof TableToolbar;
export { memoized as TableToolbar };

import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import {
  ColumnDef,
  Row,
  RowSelectionState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { isAfter, isBefore, isDate, isEqual as isDateEqual, startOfDay } from 'date-fns';
import {
  ChangeEvent,
  MouseEvent,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useVirtual } from 'react-virtual';

import { DEFAULT_ROWS_PER_PAGE } from '../../../configs/defaults';
import { TableColumn } from '../../../interfaces/PrimaryTable';
import { getValueForKey } from '../../../utils/objectUtils';
import { parseStringToDate } from '../../../utils/stringUtils';
import { getTableCellStyle, getTableRowValue } from '../../../utils/table/tableUtils';
import { PrimaryTableEmptyRow } from './EmptyRow/EmptyRow';
import { TableHeaderCell } from './HeaderCell/HeaderCell';
import { TableHeaderFilterCell } from './HeaderFilterCell/HeaderFilterCell';
import { TablePaginationToolbar } from './Pagination/Pagination';
import { PrimaryTableProps, TableRowAction, TableRowsAction } from './Primary.types';
import { TableRowCell } from './RowCell/RowCell';
import { TableToolbar } from './Toolbar/Toolbar';

const PrimaryTable = <T,>({
  color = 'primary',
  columns,
  customRowActions,
  customTableActions,
  empty,
  enableColumnResizing = true,
  extraGlobalFilterColumnIds,
  initialState,
  rows,
  rowActionsVariant = 'menu',
  rowsPerPageOptions,
  sx,
  totalCount,
  useColumnVisibility = true,
  usePagination = true,
  useRowActions = true,
  useRowExpandCollapse = false,
  useRowSelection = true,
  useSelectedRows = true,
  useVirtualizedRows = false,
  getCanSelectRow,
  getRowStyle,
  getRowId,
  getSubRows,
  hideRowActions,
  onAdd,
  onDelete,
  onEdit,
  onExport,
  onFilter,
  onPageChange,
  onRowSelected,
  onRowsSelected,
  onSave,
  onSort,
  onStateChange,
  onView,
}: PrimaryTableProps<T>) => {
  const { t } = useTranslation();
  const tableContainerRef = useRef<HTMLTableSectionElement>(null);

  const rowsActions = useMemo(
    () => (customRowActions ?? []).filter(({ context }) => !context || context === 'rows') as TableRowsAction<T>[],
    [customRowActions],
  );
  const rowActions = useMemo(
    () => (customRowActions ?? []).filter(({ context }) => !context || context === 'row') as TableRowAction<T>[],
    [customRowActions],
  );

  const [data, setData] = useState(rows);
  const [columnFilters, setColumnFilters] = useState(initialState?.columnFilters ?? []);
  const [columnVisibility, setColumnVisibility] = useState(
    initialState?.columnVisibility ?? {
      select: true,
      actions: true,
      ...columns.reduce(
        (acc, column) => ({
          ...acc,
          [column.id]: !useColumnVisibility || column.initialVisibility !== 'hidden',
        }),
        {},
      ),
    },
  );
  const [expanded, setExpanded] = useState(initialState?.expanded ?? {});
  const [globalFilter, setGlobalFilter] = useState((initialState?.globalFilter as string | undefined) ?? '');
  const [pagination, setPagination] = useState(
    initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: DEFAULT_ROWS_PER_PAGE[0],
    },
  );
  const [rowSelection, setRowSelection] = useState(initialState?.rowSelection ?? {});
  const [sorting, setSorting] = useState(initialState?.sorting ?? []);
  const [editing, setEditing] = useState(false);
  const [areFiltersVisible, setFiltersVisible] = useState(
    initialState?.columnFilters !== undefined && initialState.columnFilters.length !== 0,
  );
  const [headerHeight, setHeaderHeight] = useState(0);
  const headRef = useRef<HTMLTableRowElement>(null);

  useLayoutEffect(() => {
    const trigger = () => {
      if (headRef.current) {
        setHeaderHeight(headRef.current.clientHeight);
      }
    };

    if (headRef.current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(headRef.current);
      }
      trigger();
    }
  }, [headRef]);

  const useGlobalFilter = useMemo(() => columns.some(({ enableGlobalFilter }) => enableGlobalFilter), [columns]);
  const useColumnFilter = useMemo(
    () => !useGlobalFilter && columns.some(({ enableColumnFilter }) => enableColumnFilter),
    [columns, useGlobalFilter],
  );

  const isEditing = useDeferredValue(editing);
  const selectedRows = useMemo(() => {
    if (!getSubRows) {
      return Object.keys(rowSelection)
        .map((id) => rows.find((row) => getRowId(row) === id))
        .filter((it) => !!it) as T[];
    }

    const mapSubRows = (rows: T[]): T[] =>
      rows.reduce<T[]>((acc, row) => {
        const subRows = getSubRows(row, 0);
        if (!subRows || subRows.length === 0) {
          return [...acc, row];
        }
        return [...acc, ...mapSubRows(subRows)];
      }, []);
    const subRows = mapSubRows(rows);

    return Object.keys(rowSelection)
      .map((id) => subRows.find((row) => getRowId(row) === id))
      .filter((it) => !!it) as T[];
  }, [rowSelection, rows, getRowId, getSubRows]);

  useEffect(() => {
    if (onRowsSelected) {
      onRowsSelected(selectedRows);
    }
    // eslint-disable-next-line
  }, [selectedRows]);

  const table = useReactTable({
    autoResetPageIndex: false,
    columnResizeMode: 'onChange',
    columns: [
      ...(useRowSelection
        ? [
            {
              id: 'select',
              size: 50,
            },
          ]
        : []),
      ...columns.map(
        ({ id, getRowValue, enableColumnFilter, enableGlobalFilter, enableSorting, filterFn, size, ...meta }) =>
          ({
            id,
            accessorFn: (row, index) => getRowValue?.(row, index) ?? getValueForKey(id, row) ?? '',
            enableColumnFilter: !!enableColumnFilter,
            enableGlobalFilter: !!enableGlobalFilter,
            enableSorting: !!enableSorting,
            filterFn: filterFn ?? 'auto',
            header: t(meta.label),
            size,
            meta,
          }) as ColumnDef<T>,
      ),
      ...(useRowActions && (rowActions.length !== 0 || onEdit || onDelete || onExport || onRowSelected)
        ? [
            {
              id: 'actions',
              size: 125,
              header: t('common.component.table.actions'),
            },
          ]
        : []),
    ],
    data,
    enableColumnFilters: true,
    enableColumnResizing,
    enableFilters: true,
    enableGlobalFilter: true,
    enableMultiRowSelection: !onRowSelected,
    enablePinning: true,
    enableRowSelection: getCanSelectRow ? (row) => getCanSelectRow(row.original) : true,
    enableSorting: true,
    enableSubRowSelection: false,
    filterFns: {
      inDateRange: (row: Row<T>, columnId: string, filterValue?: string) => {
        if (filterValue === undefined || !Array.isArray(filterValue) || (!filterValue[0] && !filterValue[1])) {
          return true;
        }

        const left = filterValue[0] ? startOfDay(filterValue[0] as string) : null;
        const right = filterValue[1] ? startOfDay(filterValue[1] as string) : null;
        if (!left && !right) return true;

        const checkRow = (row: Row<T>) => {
          if (row.getLeafRows().length !== 0) return false;
          const value = getTableRowValue(columnId, columns, row.original, row.index);
          const date = isDate(value) ? startOfDay(value) : typeof value === 'string' ? parseStringToDate(value) : null;
          if (!date) return false;
          if (left && right) {
            return (isAfter(date, left) || isDateEqual(date, left)) && (isBefore(date, right) || isEqual(date, right));
          }
          if (left) {
            return isAfter(date, left) || isDateEqual(date, left);
          }
          if (right) {
            return isBefore(date, right) || isDateEqual(date, right);
          }
          return false;
        };
        const leafRows = row.getLeafRows();
        return leafRows.length ? leafRows.some(checkRow) : checkRow(row);
      },
    },
    filterFromLeafRows: true,
    initialState: {
      columnPinning: {
        left: ['select', ...columns.filter(({ sticky }) => sticky === 'left').map(({ id }) => id)],
        right: [...columns.filter(({ sticky }) => sticky === 'right').map(({ id }) => id), 'actions'],
      },
    },
    manualFiltering: !!onFilter,
    manualPagination: !!onPageChange,
    manualSorting: !!onSort,
    sortDescFirst: true,
    state: {
      columnFilters,
      columnVisibility,
      expanded,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: usePagination ? getPaginationRowModel() : undefined,
    getRowId,
    getSubRows,
    isMultiSortEvent: () => false,
    onColumnFiltersChange: (columnFilters) => {
      setEditing(false);
      table.resetPageIndex();
      table.resetRowSelection();
      setColumnFilters(columnFilters);
    },
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: (globalFilter) => {
      setEditing(false);
      table.resetPageIndex();
      table.resetRowSelection();
      setGlobalFilter(globalFilter as string);
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (sorting) => {
      setEditing(false);
      table.resetPageIndex();
      table.resetRowSelection();
      setSorting(sorting);
    },
  });

  const { rows: tableRows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: tableRows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = useMemo(() => (virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0), [virtualRows]);
  const paddingBottom = useMemo(
    () => (virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) : 0),
    [totalSize, virtualRows],
  );

  const rowsToRender = useMemo(() => {
    if (useVirtualizedRows) return virtualRows.map((virtualRow) => tableRows[virtualRow.index]);

    return tableRows;
  }, [tableRows, useVirtualizedRows, virtualRows]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        columnFilters,
        columnVisibility,
        expanded,
        globalFilter,
        pagination,
        rowSelection,
        sorting,
      });
    }
    // eslint-disable-next-line
  }, [columnFilters, columnVisibility, expanded, globalFilter, pagination, rowSelection, sorting]);

  useEffect(() => {
    if (onFilter) {
      onFilter(
        columnFilters.map(({ id, value }) => ({
          column: columns.find((column) => column.id === id)!,
          value,
        })),
        {
          columns: [
            ...((extraGlobalFilterColumnIds ?? []).map((id) => ({
              id,
            })) as TableColumn<T>[]),
            ...columns.reduce<TableColumn<T>[]>(
              (acc, column) => (column.enableGlobalFilter ? [...acc, column] : acc),
              [],
            ),
          ],
          value: globalFilter,
        },
      );
    }
    // eslint-disable-next-line
  }, [columnFilters, globalFilter]);

  useEffect(() => {
    if (onRowSelected) {
      const rowId = Object.keys(rowSelection).length === 0 ? null : Object.keys(rowSelection)[0];
      if (rowId) {
        const row = rows.find((row) => getRowId(row) === rowId);
        if (row) {
          onRowSelected(row);
        }
      } else {
        onRowSelected(null);
      }
    }
    // eslint-disable-next-line
  }, [rowSelection]);

  useEffect(() => {
    if (onSort) {
      onSort(sorting);
    }
    // eslint-disable-next-line
  }, [sorting]);

  useEffect(() => {
    setData(rows);
    if (!onRowSelected && !onRowsSelected) {
      table.resetRowSelection();
    } else if (onRowsSelected && !usePagination) {
      const filteredRows = selectedRows.filter((row) => !rows.includes(row));
      if (filteredRows.length !== selectedRows.length) {
        const getRowIds = () => {
          if (!getSubRows) return filteredRows.map(getRowId);

          const mapSubRows = (rows: T[]): string[] =>
            rows.reduce<string[]>((acc, row) => {
              const subRows = getSubRows(row, 0);
              if (!subRows || subRows.length === 0) {
                return [...acc, getRowId(row)];
              }
              return [...acc, getRowId(row), ...mapSubRows(subRows)];
            }, []);
          return mapSubRows(filteredRows);
        };
        const rowSelection = getRowIds().reduce(
          (acc, id) => ({
            ...acc,
            [id]: true,
          }),
          {},
        );

        table.setRowSelection(rowSelection);
      }
    }
    // eslint-disable-next-line
  }, [rows]);

  // Table global handlers
  const handleToggleFiltersVisible = useCallback(() => {
    setFiltersVisible((areFiltersVisible) => !areFiltersVisible);
  }, []);
  const handleResetColumnFilters = useCallback(() => {
    table.resetColumnFilters(true);
  }, [table]);

  const handleEdit = useMemo(() => {
    if (!onSave) {
      return undefined;
    }
    return () => {
      setEditing(true);
    };
  }, [onSave]);
  const handleDelete = useMemo(() => {
    if (!onDelete) {
      return undefined;
    }
    return () => {
      onDelete(selectedRows, () => {
        table.resetRowSelection();
      });
    };
  }, [onDelete, selectedRows, table]);
  const handleExport = useMemo(() => {
    if (!onExport) {
      return undefined;
    }
    return () => {
      onExport(selectedRows.length ? selectedRows : undefined);
    };
  }, [selectedRows, onExport]);
  const handleCancel = useCallback(() => {
    setEditing(false);
    setData(rows);
  }, [rows]);
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(data, () => {
        setEditing(false);
      });
    }
  }, [onSave, data]);
  const handleCollapse = useCallback(() => {
    table.toggleAllRowsExpanded(false);
  }, [table]);
  const handleExpand = useCallback(() => {
    table.toggleAllRowsExpanded(true);
  }, [table]);

  // Table row handlers
  const handleChangeRow = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    setData((data) =>
      data.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  }, []);
  const handleDeleteRow = useMemo(() => {
    if (!onDelete) {
      return undefined;
    }
    return (row: T) => {
      onDelete(row, () => {
        table.setRowSelection((rowSelection) =>
          Object.keys(rowSelection)
            .filter((id) => id !== getRowId(row))
            .reduce<RowSelectionState>(
              (acc, id) => ({
                ...acc,
                [id]: rowSelection[id],
              }),
              {},
            ),
        );
      });
    };
  }, [table, onDelete, getRowId]);
  const handleViewRow = useCallback(
    (row: T) => () => {
      if (onView) {
        onView(row);
      }
    },
    [onView],
  );

  // Pagination handlers
  const handlePageChange = useCallback(
    (_: MouseEvent<HTMLButtonElement> | null, pageIndex: number) => {
      setEditing(false);
      table.resetRowSelection();
      table.setPagination((pagination) => ({
        ...pagination,
        pageIndex,
      }));
      if (onPageChange) {
        onPageChange({
          direction:
            pagination.pageIndex === pageIndex ? 'none' : pagination.pageIndex < pageIndex ? 'forward' : 'backward',
          size: pagination.pageSize,
        });
      }
    },
    [table, pagination, onPageChange],
  );
  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const pageSize = parseInt(event.target.value, 10);
      setEditing(false);
      table.resetRowSelection();
      table.setPagination({
        pageIndex: 0,
        pageSize,
      });
      if (onPageChange) {
        onPageChange({
          direction: 'none',
          size: pageSize,
        });
      }
    },
    [table, onPageChange],
  );

  return (
    <>
      <TableToolbar
        actionsProps={
          customTableActions || onExport || onSave || onAdd
            ? {
                customTableActions,
                editing,
                onAdd,
                onCancel: handleCancel,
                onEdit: handleEdit,
                onExport: handleExport,
                onSave: handleSave,
              }
            : undefined
        }
        columnVisibilityProps={
          useColumnVisibility
            ? {
                columnVisibility: columnVisibility,
                columns: table.getAllLeafColumns(),
                onColumnVisibilityChange: table.setColumnVisibility,
              }
            : undefined
        }
        paginationProps={
          usePagination
            ? {
                count: totalCount ?? table.getFilteredRowModel().rows.length,
                page: pagination.pageIndex,
                rowsPerPage: pagination.pageSize,
                rowsPerPageOptions,
                onPageChange: handlePageChange,
                onRowsPerPageChange: handleRowsPerPageChange,
              }
            : undefined
        }
        rowExpandCollapseProps={
          useRowExpandCollapse
            ? {
                onCollapse: handleCollapse,
                onExpand: handleExpand,
              }
            : undefined
        }
        rowSelectionProps={
          onRowSelected || !useSelectedRows || (!handleDelete && !handleExport && rowsActions.length === 0)
            ? undefined
            : {
                customRowsActions: rowsActions,
                selectedRows,
                onDelete: handleDelete,
                onExport: handleExport,
              }
        }
        searchProps={
          useGlobalFilter
            ? {
                areFiltersVisible: areFiltersVisible,
                columnFilters: columnFilters.length,
                hasFilters: columns.some((it) => it.enableColumnFilter),
                value: globalFilter,
                onSearch: table.setGlobalFilter,
                onToggleFiltersVisible: handleToggleFiltersVisible,
              }
            : undefined
        }
      />

      <TableContainer sx={sx} ref={tableContainerRef}>
        <Table sx={{ borderCollapse: 'separate', width: '100%' }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} ref={headRef}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    checkbox={{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                    color={color}
                    header={header}
                    sx={getTableCellStyle(header.column, table, 'header')}
                  />
                ))}
              </TableRow>
            ))}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={`MuiTableRow-filters ${color}`}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderFilterCell
                    key={header.id}
                    areFiltersVisible={areFiltersVisible || useColumnFilter}
                    header={header}
                    sx={getTableCellStyle(header.column, table, 'header', headerHeight)}
                    onResetColumnFilters={handleResetColumnFilters}
                  />
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {useVirtualizedRows && paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {rowsToRender.map((row) => (
              <TableRow
                key={row.id}
                selected={row.getCanSelect() && row.getIsSelected()}
                onClick={handleViewRow(row.original)}
                className={classNames({
                  'Mui-children': !!row.getParentRow(),
                  'Mui-disabled': onView === undefined,
                  'Mui-expanded': row.getCanExpand() && row.getIsExpanded(),
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableRowCell
                    key={cell.id}
                    actionsVariant={rowActionsVariant}
                    cell={cell}
                    color={color}
                    customRowActions={rowActions}
                    editing={isEditing}
                    sx={getTableCellStyle(cell.column, table, 'row')}
                    value={getTableRowValue(cell.column.id, columns, row.original, row.index)}
                    getRowStyle={getRowStyle}
                    hideRowActions={hideRowActions}
                    onChange={handleChangeRow}
                    onDelete={handleDeleteRow}
                    onEdit={onEdit}
                    onExport={onExport}
                  />
                ))}
              </TableRow>
            ))}
            {useVirtualizedRows && paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
            {data.length === 0 && <PrimaryTableEmptyRow colSpan={table.getVisibleLeafColumns().length} empty={empty} />}
          </TableBody>
        </Table>
      </TableContainer>

      {usePagination && (
        <TablePaginationToolbar
          count={totalCount ?? table.getFilteredRowModel().rows.length}
          page={pagination.pageIndex}
          rowsPerPage={pagination.pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{ pt: '8px !important', width: '100%' }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </>
  );
};

const memoized = memo(PrimaryTable, isEqual) as typeof PrimaryTable;
export { memoized as PrimaryTable };

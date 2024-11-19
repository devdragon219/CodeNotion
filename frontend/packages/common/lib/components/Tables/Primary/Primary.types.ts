import { SvgIconComponent } from '@mui/icons-material';
import { ButtonProps, SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { TableState } from '@tanstack/react-table';
import { ParseKeys } from 'i18next';
import { ReactElement, ReactNode } from 'react';

import {
  TableColumn,
  TableColumnFilter,
  TableGlobalFilter,
  TablePage,
  TableSort,
} from '../../../interfaces/PrimaryTable';

interface BaseTableAdd {
  color?: ButtonProps['color'];
  icon?: ReactElement;
  label: ParseKeys;
}

export interface TableSingleAdd extends BaseTableAdd {
  onClick: () => void;
}

export type TableMultiAdd = TableSingleAdd[];

export interface TableMenuAdd extends BaseTableAdd {
  actions: TableMultiAdd;
}

export type TableAdd = (() => void) | TableSingleAdd | TableMultiAdd | TableMenuAdd;

interface BaseTableRowAction<T> {
  context?: 'row' | 'rows';
  icon?: SvgIconComponent;
  id: string;
  label: ParseKeys;
  onClick: (rows: T | T[]) => void;
}

export interface TableRowAction<T> extends Omit<BaseTableRowAction<T>, 'context' | 'onClick'> {
  context: 'row';
  onClick: (row: T) => void;
}

export interface TableRowsAction<T> extends Omit<BaseTableRowAction<T>, 'context' | 'onClick'> {
  context: 'rows';
  onClick: (rows: T[]) => void;
}

export type CustomTableRowAction<T> = BaseTableRowAction<T> | TableRowAction<T> | TableRowsAction<T>;

export type CustomTableAction = {
  icon?: SvgIconComponent;
  id: string;
  label: ParseKeys;
  onClick: () => void;
};

export interface PrimaryTableProps<T> {
  color?: 'primary' | 'secondary';
  columns: TableColumn<T>[];
  customRowActions?: CustomTableRowAction<T>[];
  customTableActions?: CustomTableAction[] | ReactNode;
  empty?: ParseKeys;
  enableColumnResizing?: boolean;
  extraGlobalFilterColumnIds?: string[];
  initialState?: Partial<TableState>;
  rows: T[];
  rowActionsVariant?: 'inline' | 'menu';
  rowsPerPageOptions?: number[];
  sx?: SxProps<Theme>;
  totalCount?: number;
  // To display or not select for hiding/showing columns
  useColumnVisibility?: boolean;
  // To display or not pagination buttons
  usePagination?: boolean;
  // To display or not row actions column
  useRowActions?: boolean;
  // To display or not expand/collapse buttons
  useRowExpandCollapse?: boolean;
  // To display or not row selection column
  useRowSelection?: boolean;
  // To display or not rows selected box
  useSelectedRows?: boolean;
  // To use virtualized rows
  useVirtualizedRows?: boolean;
  getCanSelectRow?: (row: T) => boolean;
  getRowId: (row: T) => string;
  getRowStyle?: (row: T, theme: Theme) => SystemStyleObject<Theme>;
  getSubRows?: (row: T, index: number) => undefined | T[];
  hideRowActions?: (row: T) => boolean | string | string[];
  onAdd?: TableAdd;
  onDelete?: (rows: T | T[], onComplete: () => void) => void;
  onEdit?: (row: T) => void;
  onExport?: (rows?: T | T[]) => void;
  onFilter?: (columnFilters: TableColumnFilter<T>[], globalFilter: TableGlobalFilter<T>) => void;
  onPageChange?: (page: TablePage) => void;
  onRowSelected?: (row: T | null) => void;
  onRowsSelected?: (rows: T[]) => void;
  onSave?: (rows: T[], onComplete: () => void) => void;
  onSort?: (columns: TableSort[]) => void;
  onStateChange?: (state: Partial<TableState>) => void;
  onView?: (row: T) => void;
}

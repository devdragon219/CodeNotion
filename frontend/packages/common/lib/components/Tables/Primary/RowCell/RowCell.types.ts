import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { Cell } from '@tanstack/react-table';

import { TableRowAction } from '../Primary.types';

export interface TableRowCellProps<T> {
  actionsVariant?: 'inline' | 'menu';
  cell: Cell<T, unknown>;
  color?: 'primary' | 'secondary';
  customRowActions: TableRowAction<T>[];
  editing: boolean;
  sx: SxProps<Theme>;
  value?: unknown;
  getRowStyle?: (row: T, theme: Theme) => SystemStyleObject<Theme>;
  hideRowActions?: (row: T) => boolean | string | string[];
  onChange: (rowIndex: number, columnId: string, value: unknown) => void;
  onDelete?: (row: T) => void;
  onEdit?: (row: T) => void;
  onExport?: (row: T) => void;
}

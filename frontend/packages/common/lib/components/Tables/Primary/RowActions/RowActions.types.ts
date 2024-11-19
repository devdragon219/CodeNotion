import { Cell } from '@tanstack/react-table';

import { TableRowAction } from '../Primary.types';

export interface TableRowActionsProps<T> {
  cell: Cell<T, unknown>;
  customRowActions: TableRowAction<T>[];
  variant?: 'inline' | 'menu';
  hideRowActions?: (row: T) => boolean | string | string[];
  onDelete?: (row: T) => void;
  onEdit?: (row: T) => void;
  onExport?: (row: T) => void;
}

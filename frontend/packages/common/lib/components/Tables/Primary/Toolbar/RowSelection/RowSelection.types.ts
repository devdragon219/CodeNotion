import { TableRowsAction } from '../../Primary.types';

export interface ToolbarRowSelectionProps<T> {
  customRowsActions: TableRowsAction<T>[];
  selectedRows: T[];
  onDelete?: () => void;
  onExport?: () => void;
}

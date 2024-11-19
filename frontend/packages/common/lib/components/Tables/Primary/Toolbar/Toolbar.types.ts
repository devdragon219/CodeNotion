import { TablePaginationToolbarProps } from '../Pagination/Pagination.types';
import { ToolbarActionsProps } from './Actions/Actions.types';
import { ToolbarColumnVisibilityProps } from './ColumnVisibility/ColumnVisibility.types';
import { ToolbarRowExpandCollapseProps } from './RowExpandCollapse/RowExpandCollapse.types';
import { ToolbarRowSelectionProps } from './RowSelection/RowSelection.types';
import { ToolbarSearchProps } from './Search/Search.types';

export interface TableToolbarProps<T> {
  actionsProps?: ToolbarActionsProps;
  columnVisibilityProps?: ToolbarColumnVisibilityProps<T>;
  paginationProps?: TablePaginationToolbarProps;
  rowExpandCollapseProps?: ToolbarRowExpandCollapseProps;
  rowSelectionProps?: ToolbarRowSelectionProps<T>;
  searchProps?: Omit<ToolbarSearchProps, 'hasMultilineToolbar'>;
}

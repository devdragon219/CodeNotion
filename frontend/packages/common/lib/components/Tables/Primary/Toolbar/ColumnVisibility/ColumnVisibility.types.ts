import { Column, VisibilityState } from '@tanstack/react-table';

export interface ToolbarColumnVisibilityProps<T> {
  columns: Column<T>[];
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (columnVisibility: VisibilityState) => void;
}

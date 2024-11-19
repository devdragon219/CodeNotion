import { FilterFnOption } from '@tanstack/react-table';
import { ParseKeys } from 'i18next';
import { Schema } from 'yup';

export interface TableColumn<T> {
  enableColumnFilter?: boolean;
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  filterFn?: FilterFnOption<T>;
  // It is used for accessing the row when getRowValue is not provided
  id: string;
  initialVisibility?: 'hidden';
  label: ParseKeys;
  multiple?: boolean;
  options?: unknown[];
  schema?: Schema;
  size?: number;
  sticky?: 'left' | 'right';
  type?: 'boolean' | 'currency' | 'date' | 'number';
  // Set to true for avoiding interpolating row value with getOptionLabel
  useRowValue?: boolean;
  useSortedOptions?: boolean;
  getCanExpand?: (depth: number) => boolean;
  getCanSelect?: (depth: number) => boolean;
  getOptionLabel?: (option: unknown) => string;
  getRowValue?: (row: T, index: number) => unknown;
}

export interface TableColumnFilter<T> {
  column: TableColumn<T>;
  value: unknown;
}

export interface TableGlobalFilter<T> {
  columns: TableColumn<T>[];
  value: string;
}

export interface TablePage {
  direction: 'backward' | 'forward' | 'none';
  size: number;
}

export interface TableSort {
  id: string;
  desc: boolean;
}

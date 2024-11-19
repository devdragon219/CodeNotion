import '@tanstack/react-table';
import { ParseKeys } from 'i18next';
import { Schema } from 'yup';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    label: ParseKeys;
    multiple?: boolean;
    options?: unknown[];
    schema?: Schema;
    type?: 'boolean' | 'currency' | 'date' | 'number';
    useRowValue?: boolean;
    useSortedOptions?: boolean;
    getCanExpand?: (depth: number) => boolean;
    getCanSelect?: (depth: number) => boolean;
    getOptionLabel?: (option: unknown) => string;
  }

  interface FilterFns {
    inDateRange: FilterFn<unknown>;
  }
}

import { QueryVariables } from '../../interfaces/GraphQL';
import { TableColumn, TableColumnFilter, TableGlobalFilter } from '../../interfaces/PrimaryTable';
import { createObjectFromKey } from '../objectUtils';
import { getTableRangeFilter } from './tableUtils';

const getDefaultFilterInput = <TRow, T extends QueryVariables['where']>(
  column: TableColumn<TRow>,
  value: unknown,
): T => {
  switch (column.type) {
    case 'boolean':
      return createObjectFromKey(column.id, {
        eq: value,
      }) as T;
    case 'currency':
    case 'date':
    case 'number':
      return getTableRangeFilter(column.id, value) as T;
    default:
      return createObjectFromKey(column.id, {
        [column.multiple ? 'in' : 'contains']: value,
      }) as T;
  }
};

export const getTableFilterInput = <TRow, T extends QueryVariables['where']>(
  columnFilters: TableColumnFilter<TRow>[],
  globalFilter: TableGlobalFilter<TRow>,
  getFilterInput: (column: TableColumn<TRow>, value: unknown) => T = getDefaultFilterInput,
) => {
  const where = {
    and:
      columnFilters.length !== 0 ? columnFilters.map(({ column, value }) => getFilterInput(column, value)) : undefined,
    or:
      globalFilter.value.trim().length !== 0
        ? globalFilter.columns.map((column) => getFilterInput(column, globalFilter.value))
        : undefined,
  };

  return Object.keys(where).length !== 0 ? where : undefined;
};

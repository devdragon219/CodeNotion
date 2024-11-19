import { TableState } from '@tanstack/react-table';
import { DocumentNode } from 'graphql';
import { Dispatch, Key, PropsWithChildren, SetStateAction } from 'react';
import { AnyVariables, UseQueryExecute } from 'urql';

import { PageInfo, SortEnumType } from '../../gql/types';
import { QueryVariables } from '../../interfaces/GraphQL';
import { KeyOf } from '../../interfaces/KeyOf';
import {
  TableColumn,
  TableColumnFilter,
  TableGlobalFilter,
  TablePage,
  TableSort,
} from '../../interfaces/PrimaryTable.ts';

export interface TableContextProps<Variables extends QueryVariables = QueryVariables> {
  initialState: Partial<TableState>;
  pause: boolean;
  variables: Variables;
  handleDelete: <TRow>(
    context: string,
    document: DocumentNode,
    reexecuteQuery: UseQueryExecute,
    variables?: (rows: TRow | TRow[]) => AnyVariables,
  ) => (rows: TRow | TRow[], onComplete: () => void) => void;
  handleExport: <TRow>(
    columnKeys: KeyOf<TRow> | KeyOf<TRow>[] | ((row: TRow) => NonNullable<Variables['where']>),
    document: DocumentNode,
  ) => (rows?: TRow | TRow[]) => void;
  handleFilter: <TRow>(
    getFilterInput?: (column: TableColumn<TRow>, value: unknown) => Variables['where'],
  ) => (columnFilters: TableColumnFilter<TRow>[], globalFilter: TableGlobalFilter<TRow>) => void;
  handlePageChange: (pageInfo?: PageInfo) => (newPage: TablePage) => void;
  handleSort: (
    getSortInput?: (columnId: string, sortType: SortEnumType) => Variables['order'],
  ) => (columns: TableSort[]) => void;
  reset: () => void;
  setDefaultVariables: Dispatch<SetStateAction<(variables: Variables) => Variables>>;
  setInitialState: Dispatch<SetStateAction<Partial<TableState>>>;
  setPause: Dispatch<SetStateAction<boolean>>;
}

export type TableProviderProps = PropsWithChildren<{
  key: Key;
  initialState?: Partial<TableState>;
  usePagination?: boolean;
}>;

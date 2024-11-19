import { CancelOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { TableState } from '@tanstack/react-table';
import { DocumentNode } from 'graphql';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnyVariables, DocumentInput, OperationResult, UseQueryExecute, useClient } from 'urql';

import { ConfirmationDialog } from '../../components/ConfirmationDialog/ConfirmationDialog';
import { Loader } from '../../components/Loader/Loader';
import { DEFAULT_ROWS_PER_PAGE } from '../../configs/defaults';
import { PageInfo, SortEnumType, ValidationError } from '../../gql/types';
import { QueryVariables } from '../../interfaces/GraphQL';
import { KeyOf } from '../../interfaces/KeyOf';
import { TableColumn, TableColumnFilter, TableGlobalFilter, TablePage, TableSort } from '../../interfaces/PrimaryTable';
import { downloadFile } from '../../utils/fileUtils';
import { createObjectFromKey, findValueForKey, getValueForKey } from '../../utils/objectUtils';
import { getTableFilterInput } from '../../utils/table/getTableFilterInput';
import { getTableSortInput } from '../../utils/table/getTableSortInput';
import { useSnackbar } from '../snackbar/hook';
import { TableContext } from './context';
import { TableContextProps, TableProviderProps } from './types';

// eslint-disable-next-line
interface DeleteDialogProps<Data = any, TRow = any, Vars = any> {
  context: string;
  document: DocumentInput<Data, Vars>;
  rows: TRow | TRow[];
  onComplete: () => void;
  reexecuteQuery: UseQueryExecute;
  variables?: (rows: TRow | TRow[]) => Vars;
}

export const TableProvider = <Variables extends QueryVariables = QueryVariables>({
  children,
  initialState: _initialState = {},
  usePagination = true,
}: TableProviderProps) => {
  const client = useClient();
  const { showError, showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isPristine, setPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pause, setPause] = useState(true);
  const [initialState, setInitialState] = useState<Partial<TableState>>(_initialState);
  const [defaultVariables, setDefaultVariables] = useState<(variables: Variables) => Variables>(
    () => (variables: Variables) => variables,
  );
  const [queryVariables, setQueryVariables] = useState<Variables>(
    (usePagination ? { first: DEFAULT_ROWS_PER_PAGE[0] } : {}) as Variables,
  );
  const [deleteDialogProps, setDeleteDialogProps] = useState<DeleteDialogProps | null>(null);

  const variables = useMemo(() => defaultVariables(queryVariables), [defaultVariables, queryVariables]);

  useEffect(() => {
    if (!isPristine) {
      setPause(false);
    }
    setPristine(false);
    // eslint-disable-next-line
  }, [variables]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogProps(null);
  }, []);
  const confirmDelete = useCallback(async () => {
    if (deleteDialogProps) {
      const { context, document, onComplete, reexecuteQuery, variables } = deleteDialogProps;
      const rows = deleteDialogProps.rows as Record<string, unknown>;
      setLoading(true);
      const result = await client.mutation(
        document,
        variables
          ? variables(rows)
          : {
              ids: Array.isArray(rows) ? rows.map(({ id }) => Number(id)) : [Number(rows.id)],
            },
      );
      setLoading(false);
      if (findValueForKey('isSuccess', result.data)) {
        showSnackbar(
          t(
            `${context}.feedback.delete.${Array.isArray(rows) && rows.length > 1 ? 'multiple' : 'single'}` as ParseKeys,
          ),
          'success',
        );
        closeDeleteDialog();
        onComplete();
        reexecuteQuery();
      } else {
        showError(findValueForKey('validationErrors', result.data) as ValidationError[] | undefined);
      }
    }
  }, [deleteDialogProps, t, client, closeDeleteDialog, showSnackbar, showError]);

  const getExportVariables = useCallback(
    <TRow,>(
      columnKeys: KeyOf<TRow> | KeyOf<TRow>[] | ((row: TRow) => NonNullable<Variables['where']>),
      exportKey?: string,
      rows?: TRow | TRow[],
    ) => {
      const exportVariables = defaultVariables({ order: variables.order, where: variables.where } as Variables);
      if (rows) {
        const mapRowToVariable = (row: TRow) => {
          if (Array.isArray(columnKeys)) {
            return columnKeys.reduce((acc, columnKey) => {
              const value = getValueForKey(columnKey as string, row);
              if (!value) return acc;

              return {
                ...acc,
                ...createObjectFromKey(exportKey ?? (columnKey as string), {
                  eq: value,
                }),
              };
            }, {});
          }

          if (typeof columnKeys === 'function') {
            return columnKeys(row);
          }

          const value = getValueForKey(columnKeys as string, row);
          if (!value) return {};

          return createObjectFromKey(exportKey ?? (columnKeys as string), {
            eq: value,
          });
        };

        exportVariables.where = Array.isArray(rows)
          ? {
              ...(exportVariables.where ?? {}),
              or: [...(exportVariables.where?.or ?? []), ...rows.map(mapRowToVariable)],
            }
          : {
              ...(exportVariables.where ?? {}),
              or: [...(exportVariables.where?.or ?? []), mapRowToVariable(rows)],
            };
      }
      return exportVariables;
    },
    [defaultVariables, variables.order, variables.where],
  );

  const handleDelete = useCallback(
    <TRow,>(
      context: string,
      document: DocumentNode,
      reexecuteQuery: UseQueryExecute,
      variables?: (rows: TRow | TRow[]) => AnyVariables,
    ) =>
      (rows: TRow | TRow[], onComplete: () => void) => {
        setDeleteDialogProps({ context, document, rows, onComplete, reexecuteQuery, variables });
      },
    [],
  );

  const handleExport = useCallback(
    <TRow,>(
      columnKeys: KeyOf<TRow> | KeyOf<TRow>[] | ((row: TRow) => NonNullable<Variables['where']>),
      document: DocumentNode,
      exportKey?: string,
    ) =>
      async (rows?: TRow | TRow[]) => {
        setLoading(true);
        const result: OperationResult = await client.query(document, getExportVariables(columnKeys, exportKey, rows));
        setLoading(false);
        const resourceUrl = findValueForKey('resourceUrl', result.data);
        if (resourceUrl && typeof resourceUrl === 'string') {
          downloadFile(resourceUrl);
        }
      },
    [client, getExportVariables],
  );

  const handleFilter = useCallback(
    <TRow,>(getFilterInput?: (column: TableColumn<TRow>, value: unknown) => Variables['where']) =>
      (columnFilters: TableColumnFilter<TRow>[], globalFilter: TableGlobalFilter<TRow>) => {
        setQueryVariables(
          (variables) =>
            ({
              first: variables.first,
              order: variables.order,
              where: getTableFilterInput(columnFilters, globalFilter, getFilterInput),
            }) as Variables,
        );
      },
    [],
  );

  const handlePageChange = useCallback(
    (pageInfo?: PageInfo) => (page: TablePage) => {
      switch (page.direction) {
        case 'backward':
          setQueryVariables(
            (variables) =>
              ({
                last: page.size,
                before: pageInfo?.startCursor,
                where: variables.where,
                order: variables.order,
              }) as Variables,
          );
          break;
        case 'forward':
          setQueryVariables(
            (variables) =>
              ({
                first: page.size,
                after: pageInfo?.endCursor,
                where: variables.where,
                order: variables.order,
              }) as Variables,
          );
          break;
        case 'none':
          setQueryVariables(
            (variables) =>
              ({
                first: page.size,
                where: variables.where,
                order: variables.order,
              }) as Variables,
          );
      }
    },
    [],
  );

  const handleSort = useCallback(
    (getSortInput?: (columnId: string, sortType: SortEnumType) => Variables['order']) => (columns: TableSort[]) => {
      setQueryVariables(
        (variables) =>
          ({
            first: variables.first,
            where: variables.where,
            order: getTableSortInput(columns, getSortInput),
          }) as Variables,
      );
    },
    [],
  );

  const reset = useCallback(() => {
    setPause(true);
    setPristine(true);
    setInitialState(_initialState);
    setQueryVariables((usePagination ? { first: DEFAULT_ROWS_PER_PAGE[0] } : {}) as Variables);
  }, [_initialState, usePagination]);

  const contextValue: TableContextProps<Variables> = {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    reset,
    setDefaultVariables,
    setInitialState,
    setPause,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {loading && <Loader />}
      {deleteDialogProps && (
        <ConfirmationDialog
          open
          onClose={closeDeleteDialog}
          type="danger"
          icon={CancelOutlined}
          title={`${deleteDialogProps.context}.dialog.delete.title` as ParseKeys}
          description={
            `${deleteDialogProps.context}.dialog.delete.description.${
              Array.isArray(deleteDialogProps.rows) && deleteDialogProps.rows.length > 1 ? 'multiple' : 'single'
            }` as ParseKeys
          }
          actions={
            <>
              <Button color="secondary" onClick={closeDeleteDialog}>
                {t('common.button.cancel')}
              </Button>
              <Button color="destructive" onClick={confirmDelete}>
                {t('common.button.delete')}
              </Button>
            </>
          }
        />
      )}
      {children}
    </TableContext.Provider>
  );
};

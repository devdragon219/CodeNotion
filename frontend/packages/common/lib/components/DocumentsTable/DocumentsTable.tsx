import { AddCircleOutline, FileDownloadTwoTone } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { AnyVariables, useQuery } from 'urql';

import { DEFAULT_DOCUMENTS_ROWS_PER_PAGE, DEFAULT_MAX_UPLOADABLE_FILES } from '../../configs/defaults';
import { useTable } from '../../contexts/table/hook';
import { TableProvider } from '../../contexts/table/provider';
import { Document, PageInfo } from '../../gql/types';
import { DocumentTableRow, DocumentsTableRow } from '../../interfaces/DocumentsTable';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { QueryVariables } from '../../interfaces/GraphQL';
import { KeyOf } from '../../interfaces/KeyOf';
import { parseDocumentToDocumentFormInput } from '../../utils/documentField/parseDocument';
import { getDocumentDownloadUrl } from '../../utils/documentsTable/documentsTableUtils';
import { getDocumentsFilterInput } from '../../utils/documentsTable/getDocumentsFilterInput';
import { downloadFile } from '../../utils/fileUtils';
import { findValueForKey, getValueForKey } from '../../utils/objectUtils';
import { isDocumentTableRow } from '../../utils/typeNarrowings/isDocumentTableRow';
import { isDocumentsTableRow } from '../../utils/typeNarrowings/isDocumentsTableRow';
import { DocumentField } from '../Fields/Document/Document';
import { Loader } from '../Loader/Loader';
import { Slider } from '../Slider/Slider';
import { PrimaryTable } from '../Tables/Primary/Primary';
import { DocumentDialog } from './Dialog/Dialog';
import { DocumentsTableProps } from './DocumentsTable.types';

interface QueryResult<T extends DocumentsTableRow | DocumentFormInput | DocumentTableRow> {
  nodes: T[];
  pageInfo: PageInfo;
  totalCount: number;
}

const DocumentsQueryTable = <
  Variables extends QueryVariables = QueryVariables,
  T extends DocumentsTableRow | DocumentFormInput | DocumentTableRow = DocumentsTableRow,
>({
  addLabel = 'common.component.documents_table.action.add_document',
  contentCategoryGroupOptions,
  deleteProps,
  documentsKey = 'documents',
  entryStatus,
  exportDocument,
  exportKey = 'cmisId' as KeyOf<T>,
  fieldsConfig,
  fileTypes,
  multiple,
  query,
  useColumnVisibility = false,
  useDownload = true,
  usePagination = false,
  useRowExpandCollapse = true,
  useRowSelection = false,
  useSelectedRows = false,
  useSlider = false,
  defaultVariables,
  onAdd,
  onEdit,
  onFilter = getDocumentsFilterInput,
  onSort,
  ...props
}: DocumentsTableProps<Variables, T>) => {
  const [loading, setLoading] = useState(false);
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<Variables>(defaultVariables);
  const [queryState, reexecuteQuery] = useQuery({ pause, query, variables });
  const documents = useMemo(() => {
    const result = findValueForKey(documentsKey, queryState.data);
    return (
      usePagination
        ? result
        : {
            nodes: result ?? [],
            pageInfo: {},
            totalCount: Array.isArray(result) ? result.length : 0,
          }
    ) as QueryResult<T> | undefined;
  }, [queryState.data, documentsKey, usePagination]);

  const images = useMemo(
    () =>
      (documents?.nodes ?? []).reduce<string[]>((acc, row) => {
        const { cmisId, entityId } = isDocumentTableRow(row) ? row.document : row;
        const url = getDocumentDownloadUrl(cmisId, entityId);
        if (url) return [...acc, url];
        return acc;
      }, []),
    [documents?.nodes],
  );

  const getExistingDocumentNames = useCallback(
    (input?: DocumentFormInput) => {
      const getDocumentNames = (rows: T[]): string[] =>
        rows.reduce<string[]>((acc, node) => {
          if (isDocumentTableRow(node)) {
            return [
              ...acc,
              ...(node.document.cmisId !== input?.cmisId && node.document.name ? [node.document.name] : []),
            ];
          }
          if (isDocumentsTableRow(node)) {
            return [...acc, ...getDocumentNames((node.subRows ?? []) as T[])];
          }
          if (node.name) {
            return [...acc, ...(node.cmisId !== input?.cmisId ? [node.name] : [])];
          }
          return acc;
        }, []);

      return getDocumentNames(documents?.nodes ?? []);
    },
    [documents?.nodes],
  );

  const [documentDialogProps, setDocumentDialogProps] = useState<{
    input?: DocumentFormInput;
    open: boolean;
  }>({ open: false });
  const handleCloseDocumentDialog = useCallback(() => {
    setDocumentDialogProps({ open: false });
  }, []);
  const handleAddDocument = useCallback(() => {
    setDocumentDialogProps({
      open: true,
    });
  }, []);
  const handleEditDocument = useCallback((row: T) => {
    setDocumentDialogProps({
      input: parseDocumentToDocumentFormInput(row as Document),
      open: true,
    });
  }, []);
  const handleSaveDocument = useCallback(
    async (value: DocumentFormInput | DocumentFormInput[]) => {
      const execute = async () => {
        if (Array.isArray(value)) {
          return onAdd?.(value);
        }

        return onEdit?.(value);
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result) {
        handleCloseDocumentDialog();
        reexecuteQuery();
      }
    },
    [handleCloseDocumentDialog, onAdd, onEdit, reexecuteQuery],
  );

  const getRowId = useCallback(
    (row: T) => (isDocumentTableRow(row) ? String(row.document.cmisId) : String(row.cmisId ?? row.guid)),
    [],
  );
  const getSubRows = useCallback((row: T) => (isDocumentsTableRow(row) ? (row.subRows as T[]) : undefined), []);
  const hideRowActions = useCallback((row: T) => {
    if (isDocumentsTableRow(row)) return true;
    return 'export';
  }, []);

  const getCmisIds = useCallback((rows: T | T[]) => {
    if (Array.isArray(rows)) {
      return rows.map((row) => (isDocumentTableRow(row) ? row.document.cmisId : row.cmisId)) as string[];
    }
    return [isDocumentTableRow(rows) ? rows.document.cmisId : rows.cmisId] as string[];
  }, []);

  const handleDownload = useCallback((row: T) => {
    const { cmisId, entityId } = isDocumentTableRow(row) ? row.document : row;
    const downloadUrl = getDocumentDownloadUrl(cmisId, entityId);
    if (downloadUrl) {
      downloadFile(downloadUrl);
    }
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(queryState.fetching || loading) && <Loader />}
      {documentDialogProps.open && (
        <DocumentDialog
          contentCategoryGroupOptions={contentCategoryGroupOptions}
          entryStatus={entryStatus}
          existingDocumentNames={getExistingDocumentNames(documentDialogProps.input)}
          fieldsConfig={fieldsConfig}
          fileTypes={fileTypes}
          input={documentDialogProps.input}
          onClose={handleCloseDocumentDialog}
          onSave={handleSaveDocument}
        />
      )}
      {useSlider && images.length !== 0 && (
        <Grid2 size={12}>
          <Slider images={images} useExpand />
        </Grid2>
      )}
      <Grid2 size={12}>
        <PrimaryTable<T>
          {...props}
          {...(usePagination
            ? {
                totalCount: documents?.totalCount ?? 0,
                onPageChange: handlePageChange(documents?.pageInfo),
              }
            : {})}
          customRowActions={
            useDownload
              ? [
                  {
                    context: 'row',
                    icon: FileDownloadTwoTone,
                    id: 'download',
                    label: 'common.component.documents_table.action.download',
                    onClick: handleDownload,
                  },
                ]
              : undefined
          }
          empty="common.component.documents_table.text.no_documents"
          extraGlobalFilterColumnIds={['contentContains']}
          initialState={initialState}
          rowActionsVariant="inline"
          rowsPerPageOptions={DEFAULT_DOCUMENTS_ROWS_PER_PAGE}
          rows={documents?.nodes ?? []}
          getRowId={getRowId}
          getSubRows={getSubRows}
          hideRowActions={hideRowActions}
          onAdd={
            onAdd && !multiple
              ? {
                  color: 'secondary',
                  icon: <AddCircleOutline />,
                  label: addLabel,
                  onClick: handleAddDocument,
                }
              : undefined
          }
          onDelete={
            deleteProps
              ? handleDelete(
                  'common.component.documents_table',
                  deleteProps.document,
                  reexecuteQuery,
                  (rows) =>
                    ({
                      ...(typeof deleteProps.variables === 'number'
                        ? {
                            entityId: deleteProps.variables,
                          }
                        : deleteProps.variables),
                      cmisIds: getCmisIds(rows),
                    }) as AnyVariables,
                )
              : undefined
          }
          onEdit={onEdit && !multiple ? handleEditDocument : undefined}
          onExport={
            exportDocument
              ? handleExport(
                  (row) =>
                    ({
                      document: {
                        cmisId: getValueForKey(exportKey, row),
                      },
                    }) as NonNullable<Variables['where']>,
                  exportDocument,
                )
              : undefined
          }
          onFilter={handleFilter(onFilter)}
          onStateChange={setInitialState}
          onSort={handleSort(onSort)}
          useColumnVisibility={useColumnVisibility}
          usePagination={usePagination}
          useRowExpandCollapse={useRowExpandCollapse}
          useRowSelection={useRowSelection}
          useSelectedRows={useSelectedRows}
        />
      </Grid2>
      {onAdd && multiple && (
        <Grid2 size={12}>
          <DocumentField
            contentCategoryGroupOptions={contentCategoryGroupOptions}
            fieldsConfig={fieldsConfig}
            fileTypes={fileTypes}
            label="common.component.documents_table.field.documents_upload"
            multiple
            useDocumentTable={false}
            value={[]}
            maxFiles={DEFAULT_MAX_UPLOADABLE_FILES}
            onChange={handleSaveDocument}
          />
        </Grid2>
      )}
    </Grid2>
  );
};

export const DocumentsTable = <
  Variables extends QueryVariables = QueryVariables,
  T extends DocumentsTableRow | DocumentFormInput | DocumentTableRow = DocumentsTableRow,
>({
  documentsKey = 'documents',
  initialState,
  tableKey,
  usePagination = false,
  ...props
}: DocumentsTableProps<Variables, T>) => (
  <TableProvider key={tableKey ?? documentsKey} initialState={initialState} usePagination={usePagination}>
    <DocumentsQueryTable {...props} documentsKey={documentsKey} usePagination={usePagination} />
  </TableProvider>
);

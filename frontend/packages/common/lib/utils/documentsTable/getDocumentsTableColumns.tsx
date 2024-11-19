import { WarningAmber } from '@mui/icons-material';
import { isBefore, startOfToday } from 'date-fns';
import { TFunction } from 'i18next';

import { ContentCategoryGroup } from '../../enums/ContentCategory';
import { ContentCategory } from '../../gql/types';
import { DocumentFieldConfig } from '../../interfaces/DocumentField';
import { DocumentsTableColumn, DocumentsTableRow } from '../../interfaces/DocumentsTable';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { TableColumn } from '../../interfaces/PrimaryTable';
import { getDocumentFieldDefaultLabel } from '../documentField/documentFieldUtils';
import { parseStringToDate } from '../stringUtils';
import { countSubRows } from './documentsTableUtils';

export interface DocumentsTableColumnsOptions<T extends DocumentsTableRow | DocumentFormInput = DocumentsTableRow> {
  contentCategoryGroupOptions?: ContentCategoryGroup[];
  contentCategoryOptions?: ContentCategory[];
  extraColumns?: DocumentsTableColumn<T>[];
  extraGroupingColumns?: DocumentsTableColumn<T>[];
  fieldsConfig?: DocumentFieldConfig[];
  useExpiredColumn?: boolean;
  useFilter?: boolean;
  useGroupByContentCategoryGroup?: boolean;
  useGroupByContentCategory?: boolean;
  useSelectableColumn?: boolean;
}

export const getDocumentsTableColumns = <T extends DocumentsTableRow | DocumentFormInput = DocumentsTableRow>(
  t: TFunction,
  options: DocumentsTableColumnsOptions<T>,
): TableColumn<T>[] => {
  const {
    contentCategoryGroupOptions,
    contentCategoryOptions,
    extraColumns,
    extraGroupingColumns,
    fieldsConfig,
    useSelectableColumn,
  } = options;
  const useExpiredColumn = options.useExpiredColumn ?? false;
  const useFilter = options.useFilter ?? true;
  const useGroupByContentCategoryGroup = options.useGroupByContentCategoryGroup ?? false;
  const useGroupByContentCategory = options.useGroupByContentCategory ?? false;

  const contentCategoryGroupConfig = fieldsConfig?.find(({ fieldName }) => fieldName === 'contentCategoryGroup');
  const contentCategoryConfig = fieldsConfig?.find(({ fieldName }) => fieldName === 'contentCategory');

  const parsedExtraGroupingColumns: TableColumn<T>[] = extraGroupingColumns
    ? extraGroupingColumns.map((extraColumn, index) => ({
        ...extraColumn,
        getCanExpand: (depth: number) => depth === index,
        ...(useSelectableColumn
          ? {
              getCanSelect: (depth: number) => depth === index,
            }
          : {}),
      }))
    : [];
  const extraGroupingColumnsCount = parsedExtraGroupingColumns.length;

  const contentCategoryGroupColumn: TableColumn<T> = {
    id: 'contentCategoryGroup',
    label: contentCategoryGroupConfig?.label ?? getDocumentFieldDefaultLabel('contentCategoryGroup'),
    enableColumnFilter: useFilter,
    useRowValue: true,
    multiple: (contentCategoryGroupOptions ?? []).length > 2,
    options: contentCategoryGroupOptions ?? [],
    getOptionLabel: (option) =>
      option ? t(`common.enum.content_category_group.${option as ContentCategoryGroup}`) : '',
    getRowValue: (row) => {
      if (useGroupByContentCategoryGroup && 'fileName' in row) {
        return '';
      }
      return row.contentCategoryGroup
        ? [
            t(`common.enum.content_category_group.${row.contentCategoryGroup as ContentCategoryGroup}`),
            useGroupByContentCategoryGroup ? ` (${countSubRows(row)})` : '',
          ].join('')
        : '';
    },
    ...(useGroupByContentCategoryGroup
      ? {
          getCanExpand: (depth) => depth === extraGroupingColumnsCount,
        }
      : {}),
    ...(useSelectableColumn && useGroupByContentCategoryGroup
      ? {
          getCanSelect: (depth) => depth === extraGroupingColumnsCount,
        }
      : {}),
  };
  const contentCategoryColumn: TableColumn<T> = {
    id: 'contentCategory',
    label: contentCategoryConfig?.label ?? getDocumentFieldDefaultLabel('contentCategory'),
    enableColumnFilter: useFilter,
    useRowValue: true,
    multiple: (contentCategoryOptions ?? []).length > 2,
    options: contentCategoryOptions ?? [],
    getOptionLabel: (option) => (option ? t(`common.enum.content_category.${option as ContentCategory}`) : ''),
    getRowValue: (row) => {
      if (useGroupByContentCategory && 'fileName' in row) {
        return '';
      }
      return row.contentCategory
        ? [
            t(`common.enum.content_category.${row.contentCategory as ContentCategory}`),
            useGroupByContentCategory ? ` (${countSubRows(row)})` : '',
          ].join('')
        : '';
    },
    ...(useGroupByContentCategory
      ? {
          getCanExpand: (depth) => depth === extraGroupingColumnsCount + (contentCategoryGroupConfig ? 1 : 0),
        }
      : {}),
    ...(useSelectableColumn && useGroupByContentCategory
      ? {
          getCanSelect: (depth) => depth === extraGroupingColumnsCount + (contentCategoryGroupConfig ? 1 : 0),
        }
      : {}),
  };

  const expandableColumns: TableColumn<T>[] = [
    ...(useGroupByContentCategoryGroup ? [contentCategoryGroupColumn] : []),
    ...(useGroupByContentCategory ? [contentCategoryColumn] : []),
  ];

  const documentNameConfig = fieldsConfig?.find(({ fieldName }) => fieldName === 'name');
  const documentNameColumn: TableColumn<T> = {
    id: 'name',
    label: documentNameConfig?.label ?? getDocumentFieldDefaultLabel('name'),
    enableColumnFilter: useFilter,
    enableGlobalFilter: useFilter,
    ...(useSelectableColumn
      ? {
          getCanSelect: (depth) =>
            depth ===
            extraGroupingColumnsCount +
              (useGroupByContentCategoryGroup &&
              contentCategoryGroupConfig &&
              useGroupByContentCategory &&
              contentCategoryConfig
                ? 2
                : (useGroupByContentCategoryGroup && contentCategoryGroupConfig) ||
                    (useGroupByContentCategory && contentCategoryConfig)
                  ? 1
                  : 0),
        }
      : {}),
  };

  const expiredColumn: TableColumn<T> = {
    id: 'expired',
    label: 'common.component.document_field.field.expired',
    type: 'boolean',
    sticky: 'right',
    enableColumnFilter: useFilter,
    useRowValue: true,
    getRowValue: (row) => {
      const until = typeof row.until === 'string' ? parseStringToDate(row.until) : row.until;
      return until && isBefore(until, startOfToday()) ? (
        <WarningAmber
          sx={(theme) => ({
            color: theme.palette.danger[300],
            width: 24,
            height: 24,
          })}
        />
      ) : null;
    },
  };

  return [
    ...parsedExtraGroupingColumns,
    ...expandableColumns,
    ...(documentNameConfig ? [documentNameColumn] : []),
    ...(extraColumns ?? []),
  ]
    .concat(
      fieldsConfig
        ? fieldsConfig
            .filter(({ fieldName }) => {
              if (fieldName === 'contentCategoryGroup') {
                return !useGroupByContentCategoryGroup;
              }
              if (fieldName === 'contentCategory') {
                return !useGroupByContentCategory;
              }
              return fieldName !== 'name';
            })
            .map<TableColumn<T>>(({ fieldName, label }) => {
              switch (fieldName) {
                case 'contentCategoryGroup':
                  return contentCategoryGroupColumn;
                case 'contentCategory':
                  return contentCategoryColumn;
                default:
                  return {
                    id: fieldName,
                    label: label ?? getDocumentFieldDefaultLabel(fieldName),
                    enableColumnFilter: useFilter,
                    enableGlobalFilter: useFilter && !['issueDate', 'since', 'until'].includes(fieldName),
                    type: ['issueDate', 'since', 'until'].includes(fieldName) ? 'date' : undefined,
                  };
              }
            })
        : [],
    )
    .concat(useExpiredColumn && fieldsConfig?.find((el) => el.fieldName === 'until') ? [expiredColumn] : [])
    .concat([
      {
        id: 'fileName',
        label: getDocumentFieldDefaultLabel('fileName'),
        enableColumnFilter: useFilter,
        enableGlobalFilter: useFilter,
      },
      {
        id: 'creationDate',
        type: 'date',
        label: getDocumentFieldDefaultLabel('creationDate'),
        enableColumnFilter: useFilter,
        filterFn: 'inDateRange',
      },
      {
        id: 'uploaderName',
        label: getDocumentFieldDefaultLabel('uploaderName'),
        enableColumnFilter: useFilter,
        enableGlobalFilter: useFilter,
      },
    ]);
};

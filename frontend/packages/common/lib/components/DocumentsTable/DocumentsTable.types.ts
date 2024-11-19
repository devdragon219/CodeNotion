import { DocumentNode } from 'graphql';
import { ParseKeys } from 'i18next';
import { Key } from 'react';

import { ContentCategoryGroup } from '../../enums/ContentCategory';
import { FileType } from '../../enums/FileType';
import { EntryStatus, SortEnumType } from '../../gql/types';
import { DocumentFieldConfig } from '../../interfaces/DocumentField';
import { DocumentTableRow, DocumentsTableColumn, DocumentsTableRow } from '../../interfaces/DocumentsTable';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { QueryVariables } from '../../interfaces/GraphQL';
import { KeyOf } from '../../interfaces/KeyOf';
import { TableColumn } from '../../interfaces/PrimaryTable';
import { PrimaryTableProps } from '../Tables/Primary/Primary.types';

export interface DocumentsTableProps<
  Variables extends QueryVariables = QueryVariables,
  T extends DocumentsTableRow | DocumentFormInput | DocumentTableRow = DocumentsTableRow,
> extends Pick<
    PrimaryTableProps<T>,
    | 'color'
    | 'initialState'
    | 'useColumnVisibility'
    | 'usePagination'
    | 'useRowExpandCollapse'
    | 'useRowSelection'
    | 'useSelectedRows'
    | 'onRowsSelected'
  > {
  addLabel?: ParseKeys;
  columns: DocumentsTableColumn<T>[];
  contentCategoryGroupOptions?: ContentCategoryGroup[];
  deleteProps?: {
    document: DocumentNode;
    variables: number | Record<string, number>;
  };
  documentsKey?: string;
  entryStatus?: EntryStatus | null;
  exportDocument?: DocumentNode;
  exportKey?: KeyOf<T>;
  fieldsConfig?: DocumentFieldConfig[];
  fileTypes?: FileType[];
  multiple?: boolean;
  query: DocumentNode;
  tableKey?: Key;
  useDownload?: boolean;
  useFilter?: boolean;
  useSlider?: boolean;
  defaultVariables?: (variables: Variables) => Variables;
  onAdd?: (rows: DocumentFormInput[]) => Promise<boolean>;
  onEdit?: (row: DocumentFormInput) => Promise<boolean>;
  onFilter?: (column: TableColumn<T>, value: unknown) => Variables['where'];
  onSort?: (columnId: string, sortType: SortEnumType) => Variables['order'];
  onView?: (row: T) => void;
}

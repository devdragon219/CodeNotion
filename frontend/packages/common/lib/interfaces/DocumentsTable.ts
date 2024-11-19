import { Document, DocumentRow } from '../gql/types';
import { DocumentFormInput } from './FormInputs/Document';
import { TableColumn } from './PrimaryTable';

export type DocumentTableRow = Partial<Omit<DocumentRow, 'document'>> & {
  document: Partial<Document>;
};

export type DocumentsTableColumn<
  T extends DocumentsTableRow | DocumentFormInput | DocumentTableRow = DocumentsTableRow,
> = Omit<TableColumn<T>, 'getCanExpand' | 'getCanSelect'>;

export type DocumentsTableRow = Partial<Document | DocumentTableRow> & {
  subRows?: DocumentsTableRow[];
} & {
  [key in string]?: string;
};

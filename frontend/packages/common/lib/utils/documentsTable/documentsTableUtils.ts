import { DocumentsTableRow } from '../../interfaces/DocumentsTable';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { isDocumentsTableRow } from '../typeNarrowings/isDocumentsTableRow';

export const getDocumentDownloadUrl = (cmisId?: string | null, entityId?: string | null): string | null => {
  if (!cmisId || !entityId) return null;

  return `/api/v1/documents/${cmisId}/${entityId}`;
};

export const countSubRows = <T extends DocumentsTableRow | DocumentFormInput = DocumentsTableRow>(row: T): number => {
  if (!isDocumentsTableRow(row) || !row.subRows) {
    return 0;
  }

  return row.subRows.reduce((acc, it) => {
    if (!it.subRows) {
      return acc + 1;
    }
    return acc + countSubRows(it);
  }, 0);
};

import { DocumentsTableRow } from '../../interfaces/DocumentsTable';
import { isOfType } from './isOfType';

export const isDocumentsTableRow = (row: unknown): row is DocumentsTableRow =>
  isOfType<DocumentsTableRow>(row, ['subRows']);

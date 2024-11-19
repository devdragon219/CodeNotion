import { DocumentTableRow } from '../../interfaces/DocumentsTable';
import { isOfType } from './isOfType';

export const isDocumentTableRow = (row: unknown): row is DocumentTableRow =>
  isOfType<DocumentTableRow>(row, ['document']);

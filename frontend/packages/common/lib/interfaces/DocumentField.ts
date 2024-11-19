import { GridSize } from '@mui/material';
import { ParseKeys } from 'i18next';

import { DocumentFormInput } from './FormInputs/Document';

export type DocumentFieldName = keyof Omit<
  DocumentFormInput,
  'cmisId' | 'content' | 'contentType' | 'entityId' | 'entityIntId' | 'guid' | 'issuerCode' | 'mimeType'
>;

export interface DocumentFieldConfig {
  fieldName: DocumentFieldName;
  required?: boolean;
  label?: ParseKeys;
  grid?: GridSize;
}

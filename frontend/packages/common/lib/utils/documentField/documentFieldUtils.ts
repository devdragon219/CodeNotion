import { ParseKeys } from 'i18next';

import { DocumentFieldConfig, DocumentFieldName } from '../../interfaces/DocumentField';

export const getDocumentFieldDefaultLabel = (fieldName: DocumentFieldName): ParseKeys => {
  const fallbackLabels: Record<typeof fieldName, ParseKeys> = {
    contentCategoryGroup: 'common.component.document_field.field.content_category_group',
    contentCategory: 'common.component.document_field.field.content_category',
    creationDate: 'common.component.document_field.field.upload_date',
    fileName: 'common.component.document_field.field.file_name',
    issueDate: 'common.component.document_field.field.issue_date',
    issuer: 'common.component.document_field.field.issuer',
    name: 'common.component.document_field.field.document_name',
    notes: 'common.component.document_field.field.notes',
    protocolNumber: 'common.component.document_field.field.protocol_number',
    since: 'common.component.document_field.field.valid_since',
    until: 'common.component.document_field.field.valid_until',
    uploaderName: 'common.component.document_field.field.uploaded_by',
  };

  return fallbackLabels[fieldName];
};

export const getDefaultDocumentFieldsConfig = (): DocumentFieldConfig[] => [
  { fieldName: 'name', required: true },
  { fieldName: 'protocolNumber' },
  { fieldName: 'since' },
  { fieldName: 'until' },
  { fieldName: 'issuer' },
  { fieldName: 'issueDate' },
  { fieldName: 'contentCategoryGroup', required: true },
  { fieldName: 'contentCategory', required: true },
  { fieldName: 'notes', grid: 12 },
];

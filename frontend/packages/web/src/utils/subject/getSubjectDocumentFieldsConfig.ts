import { DocumentFieldConfig } from '@realgimm5/frontend-common/interfaces';

export const getSubjectIdentityDocumentFieldsConfig = (): DocumentFieldConfig[] => [
  { fieldName: 'name', required: true },
  { fieldName: 'contentCategory', label: 'subject.field.document_type', required: true },
  { fieldName: 'protocolNumber', label: 'subject.field.document_number', required: true },
  { fieldName: 'issuer', label: 'subject.field.document_issued_by', required: true },
  { fieldName: 'since', label: 'subject.field.document_issue_date', required: true },
  { fieldName: 'until', label: 'subject.field.document_expiry_date', required: true },
  { fieldName: 'notes', grid: 12 },
];

export const getSubjectOtherDocumentFieldsConfig = (): DocumentFieldConfig[] => [
  { fieldName: 'name', required: true },
  { fieldName: 'protocolNumber' },
  { fieldName: 'since' },
  { fieldName: 'until' },
  { fieldName: 'issuer' },
  { fieldName: 'issueDate' },
  { fieldName: 'notes', grid: 12 },
];

export const getSubjectDocumentFieldsConfig = (): DocumentFieldConfig[] => [
  { fieldName: 'name', required: true },
  { fieldName: 'contentCategory', label: 'subject.field.document_type', required: true },
  { fieldName: 'protocolNumber', label: 'subject.field.document_number', required: true },
  { fieldName: 'since' },
  { fieldName: 'until' },
  { fieldName: 'issuer' },
  { fieldName: 'issueDate' },
  { fieldName: 'notes', grid: 12 },
];

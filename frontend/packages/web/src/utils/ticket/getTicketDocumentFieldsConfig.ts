import { DocumentFieldConfig } from '@realgimm5/frontend-common/interfaces';

export const getTicketDocumentFieldsConfig = (): DocumentFieldConfig[] => [
  { fieldName: 'name', required: true },
  { fieldName: 'protocolNumber' },
  { fieldName: 'since' },
  { fieldName: 'until' },
  { fieldName: 'issuer' },
  { fieldName: 'issueDate' },
  { fieldName: 'notes', grid: 12 },
];

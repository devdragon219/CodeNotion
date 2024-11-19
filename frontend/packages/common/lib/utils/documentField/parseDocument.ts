import { Document } from '../../gql/types';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { parseStringToDate } from '../stringUtils';
import { getContentCategoryGroup } from './contentCategoryUtils';

export const parseDocumentToDocumentFormInput = (document: Partial<Document>): DocumentFormInput => ({
  cmisId: document.cmisId,
  content: document.fileName ? new File([], document.fileName) : null,
  contentCategory: document.contentCategory ?? null,
  contentCategoryGroup: document.contentCategory ? getContentCategoryGroup(document.contentCategory) : null,
  contentType: document.contentType ?? null,
  creationDate: parseStringToDate(document.creationDate),
  entityId: document.entityId,
  entityIntId: document.entityIntId,
  fileName: document.fileName ?? '',
  guid: document.cmisId ?? crypto.randomUUID(),
  issueDate: parseStringToDate(document.issueDate),
  issuer: document.issuer ?? '',
  issuerCode: document.issuerCode ?? '',
  mimeType: document.mimeType ?? '',
  name: document.name ?? '',
  notes: document.notes ?? '',
  protocolNumber: document.protocolNumber ?? '',
  since: parseStringToDate(document.since),
  until: parseStringToDate(document.until),
  uploaderName: document.uploaderName ?? '',
});

export const parseDocumentsToDocumentFormInputs = (items: Partial<Document>[]): DocumentFormInput[] =>
  items.map(parseDocumentToDocumentFormInput);

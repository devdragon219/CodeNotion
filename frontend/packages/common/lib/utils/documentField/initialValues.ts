import { ContentCategoryGroup } from '../../enums/ContentCategory';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';

export const getEmptyDocumentFormInput = (
  uploaderName?: string,
  contentCategoryGroup?: ContentCategoryGroup | null,
): DocumentFormInput => ({
  content: null,
  contentCategory: null,
  contentCategoryGroup: contentCategoryGroup ?? null,
  contentType: null,
  creationDate: new Date(),
  fileName: '',
  guid: crypto.randomUUID(),
  issueDate: null,
  issuer: '',
  issuerCode: '',
  mimeType: '',
  name: '',
  notes: '',
  protocolNumber: '',
  since: null,
  until: null,
  uploaderName: uploaderName ?? '',
});

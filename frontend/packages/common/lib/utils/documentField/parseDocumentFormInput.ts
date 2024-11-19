import { ContentCategory, ContentType, DocumentInput } from '../../gql/types';
import { DocumentFormInput } from '../../interfaces/FormInputs/Document';
import { parseDateToString } from '../dateUtils';
import { getStringOrNull } from '../stringUtils';

export const getContentTypeOrNull = (mimeType?: string | null): ContentType | null => {
  const validMimeType = getStringOrNull(mimeType);

  if (!validMimeType) return null;

  if (validMimeType.startsWith('video/')) return ContentType.Video;

  switch (validMimeType) {
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
    case 'application/vnd.oasis.opendocument.text':
      return ContentType.Paper;

    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
    case 'application/vnd.oasis.opendocument.spreadsheet':
    case 'text/csv':
      return ContentType.Spreadsheet;

    case 'image/vnd.dwg':
    case 'image/vnd.dxf':
      return ContentType.CadDrawing;

    case 'application/pdf':
      return ContentType.Pdf;

    case 'message/rfc822':
      return ContentType.Email;

    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/svg+xml':
    case 'image/tiff':
      return ContentType.Image;

    default:
      return ContentType.Generic;
  }
};

export const parseDocumentFormInputToDocumentInput = (
  document: DocumentFormInput,
  options?: {
    documentNamePrefix?: string;
    fallbackContentType?: ContentType;
    fallbackCategory?: ContentCategory;
    fallbackIssueDate?: Date | null;
  },
): DocumentInput => ({
  cmisId: getStringOrNull(document.cmisId),
  content: document.content?.size ? document.content : null,
  contentCategory: document.contentCategory ?? options?.fallbackCategory ?? ContentCategory.Generic,
  contentType:
    document.contentType ??
    getContentTypeOrNull(document.mimeType) ??
    options?.fallbackContentType ??
    ContentType.Generic,
  fileName: document.fileName,
  issuer: getStringOrNull(document.issuer),
  issuerCode: getStringOrNull(document.issuerCode),
  issueDate: document.issueDate
    ? parseDateToString(document.issueDate)
    : options?.fallbackIssueDate
      ? parseDateToString(options.fallbackIssueDate)
      : null,
  mimeType: getStringOrNull(document.mimeType),
  name: getStringOrNull(document.name) ?? `${options?.documentNamePrefix ?? ''}${crypto.randomUUID()}`,
  notes: getStringOrNull(document.notes),
  protocolNumber: getStringOrNull(document.protocolNumber),
  since: parseDateToString(document.since),
  until: parseDateToString(document.until),
});

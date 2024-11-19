import { ContentCategoryGroup } from '../../enums/ContentCategory';
import { ContentCategory, ContentType } from '../../gql/types';

export interface DocumentFormInput {
  cmisId?: string | null;
  content: File | null;
  contentCategory: ContentCategory | null;
  contentCategoryGroup: ContentCategoryGroup | null;
  contentType: ContentType | null;
  creationDate: Date | null;
  entityId?: string | null;
  entityIntId?: number | null;
  fileName: string;
  guid: string;
  issueDate: Date | null;
  issuer: string;
  issuerCode: string;
  mimeType: string;
  name: string;
  notes: string;
  protocolNumber: string;
  since: Date | null;
  until: Date | null;
  uploaderName: string;
}

export interface DocumentsFieldValues {
  documents: DocumentFormInput[];
}

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type DocumentFragment = {
  __typename?: 'Document';
  cmisId: string;
  contentCategory: Types.ContentCategory;
  contentCategoryGroup: string;
  contentType: Types.ContentType;
  creationDate: string;
  entityId?: string | null;
  entityIntId?: number | null;
  fileName?: string | null;
  issueDate?: string | null;
  issuer?: string | null;
  issuerCode?: string | null;
  mimeType?: string | null;
  name: string;
  notes?: string | null;
  protocolNumber?: string | null;
  since?: string | null;
  until?: string | null;
  uploaderName?: string | null;
};

export const DocumentFragmentDoc = gql`
  fragment DocumentFragment on Document {
    cmisId
    contentCategory
    contentCategoryGroup
    contentType
    creationDate
    entityId
    entityIntId
    fileName
    issueDate
    issuer
    issuerCode
    mimeType
    name
    notes
    protocolNumber
    since
    until
    uploaderName
  }
`;

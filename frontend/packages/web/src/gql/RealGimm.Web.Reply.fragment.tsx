// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { TicketUserFragmentDoc } from './RealGimm.Web.User.fragment';

export type ReplyFragment = {
  __typename?: 'Reply';
  timestamp: string;
  isOperator: boolean;
  comment?: string | null;
  id: number;
  user?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
  documents: Array<{
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
  }>;
  images: Array<{
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
  }>;
};

export const ReplyFragmentDoc = gql`
  fragment ReplyFragment on Reply {
    timestamp
    isOperator
    user {
      ...TicketUserFragment
    }
    comment
    id
    documents {
      ...DocumentFragment
    }
    images {
      ...DocumentFragment
    }
  }
`;

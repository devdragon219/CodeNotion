// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';

export type TicketDocumentsOutputFragment = {
  __typename?: 'TicketDocumentsOutput';
  guid: string;
  ticketInternalCode: string;
  subRows: Array<{
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

export const TicketDocumentsOutputFragmentDoc = gql`
  fragment TicketDocumentsOutputFragment on TicketDocumentsOutput {
    guid
    ticketInternalCode
    subRows {
      ...DocumentFragment
    }
  }
`;

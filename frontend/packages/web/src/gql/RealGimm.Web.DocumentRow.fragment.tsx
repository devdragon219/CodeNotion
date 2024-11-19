// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';

export type DocumentRowFragment = {
  __typename?: 'DocumentRow';
  estateInternalCode?: string | null;
  estateUnitInternalCode?: string | null;
  catalogueItemInternalCode?: string | null;
  catalogueTypeInternalCode?: string | null;
  catalogueCategory?: string | null;
  catalogueSubCategory?: string | null;
  subjectInternalCode?: string | null;
  contractInternalCode?: string | null;
  isContractActive?: boolean | null;
  isContractSublocated?: boolean | null;
  estateId?: number | null;
  catalogueTypeId?: number | null;
  ticketId?: number | null;
  ticketInternalCode?: string | null;
  isTicketExcludedFromMaintenanceContract?: boolean | null;
  fcltContractId?: number | null;
  fcltContractInternalCode?: string | null;
  document: {
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
};

export const DocumentRowFragmentDoc = gql`
  fragment DocumentRowFragment on DocumentRow {
    document {
      ...DocumentFragment
    }
    estateInternalCode
    estateUnitInternalCode
    catalogueItemInternalCode
    catalogueTypeInternalCode
    catalogueCategory
    catalogueSubCategory
    subjectInternalCode
    contractInternalCode
    isContractActive
    isContractSublocated
    estateId
    catalogueTypeId
    ticketId
    ticketInternalCode
    isTicketExcludedFromMaintenanceContract
    fcltContractId
    fcltContractInternalCode
  }
`;

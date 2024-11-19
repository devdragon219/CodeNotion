// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ContractDocumentsOutputFragment = {
  __typename?: 'ContractDocumentsOutput';
  guid: string;
  contractInternalCode: string;
  subRows: Array<{
    __typename?: 'ContractDocumentsPerContentCategoryGroupOutput';
    guid: string;
    contentCategoryGroup: string;
    subRows: Array<{
      __typename?: 'ContractDocumentsPerContentCategoryOutput';
      guid: string;
      contentCategory: Types.ContentCategory;
      subRows: Array<{
        __typename?: 'ContractDocumentOutput';
        isContractSublocated: boolean;
        isContractActive: boolean;
        cmisId: string;
        creationDate: string;
        entityId?: string | null;
        entityIntId?: number | null;
        fileName?: string | null;
        issueDate?: string | null;
        issuer?: string | null;
        name: string;
        notes?: string | null;
        protocolNumber?: string | null;
        since?: string | null;
        until?: string | null;
        uploaderName?: string | null;
      }>;
    }>;
  }>;
};

export const ContractDocumentsOutputFragmentDoc = gql`
  fragment ContractDocumentsOutputFragment on ContractDocumentsOutput {
    guid
    contractInternalCode
    subRows {
      guid
      contentCategoryGroup
      subRows {
        guid
        contentCategory
        subRows {
          isContractSublocated
          isContractActive
          cmisId
          creationDate
          entityId
          entityIntId
          fileName
          issueDate
          issuer
          name
          notes
          protocolNumber
          since
          until
          uploaderName
        }
      }
    }
  }
`;

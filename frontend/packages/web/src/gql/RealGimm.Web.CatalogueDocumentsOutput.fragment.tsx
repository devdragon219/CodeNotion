// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CatalogueDocumentsCategoryOutputFragmentDoc } from './RealGimm.Web.CatalogueDocumentsCategoryOutput.fragment';

export type CatalogueDocumentsOutputFragment = {
  __typename?: 'CatalogueDocumentsOutput';
  estateInternalCode: string;
  guid: string;
  subRows: Array<{
    __typename?: 'CatalogueDocumentsCategoryOutput';
    categoryName: string;
    guid: string;
    subRows: Array<{
      __typename?: 'CatalogueDocumentsSubCategoryOutput';
      subCategoryName?: string | null;
      guid: string;
      subRows: Array<{
        __typename?: 'CatalogueDocumentsTypeOutput';
        catalogueTypeName: string;
        guid: string;
        subRows: Array<{
          __typename?: 'CatalogueDocumentsPerContentCategoryGroupOutput';
          guid: string;
          contentCategoryGroup: string;
          subRows: Array<{
            __typename?: 'CatalogueDocumentsPerContentCategoryOutput';
            guid: string;
            contentCategory: Types.ContentCategory;
            subRows: Array<{
              __typename?: 'CatalogueDocumentOutput';
              catalogueItemInternalCode?: string | null;
              estateId: number;
              catalogueTypeId: number;
              cmisId: string;
              creationDate: string;
              entityId?: string | null;
              catalogueItemId?: number | null;
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
      }>;
    }>;
  }>;
};

export const CatalogueDocumentsOutputFragmentDoc = gql`
  fragment CatalogueDocumentsOutputFragment on CatalogueDocumentsOutput {
    estateInternalCode
    guid
    subRows {
      ...CatalogueDocumentsCategoryOutputFragment
    }
  }
`;

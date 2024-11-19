// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueDocumentsCategoryOutputFragment = {
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
};

export const CatalogueDocumentsCategoryOutputFragmentDoc = gql`
  fragment CatalogueDocumentsCategoryOutputFragment on CatalogueDocumentsCategoryOutput {
    categoryName
    guid
    subRows {
      subCategoryName
      guid
      subRows {
        catalogueTypeName
        guid
        subRows {
          guid
          contentCategoryGroup
          subRows {
            guid
            contentCategory
            subRows {
              catalogueItemInternalCode
              estateId
              catalogueTypeId
              cmisId
              creationDate
              entityId
              catalogueItemId
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
    }
  }
`;

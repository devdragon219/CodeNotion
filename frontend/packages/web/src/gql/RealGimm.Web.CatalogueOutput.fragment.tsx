// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueFragment = {
  __typename?: 'CatalogueOutput';
  estateId: number;
  estateInternalCode?: string | null;
  catalogueCategory?: string | null;
  catalogueSubCategory?: string | null;
  catalogueType?: string | null;
  catalogueTypeCount: number;
  catalogueTypeId: number;
};

export const CatalogueFragmentDoc = gql`
  fragment CatalogueFragment on CatalogueOutput {
    estateId
    estateInternalCode
    catalogueCategory
    catalogueSubCategory
    catalogueType
    catalogueTypeCount
    catalogueTypeId
  }
`;

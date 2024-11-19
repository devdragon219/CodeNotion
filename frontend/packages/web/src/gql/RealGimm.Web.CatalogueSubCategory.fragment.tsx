// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueSubCategoryFragment = {
  __typename?: 'CatalogueSubCategory';
  name: string;
  internalCode: string;
  id: number;
};

export const CatalogueSubCategoryFragmentDoc = gql`
  fragment CatalogueSubCategoryFragment on CatalogueSubCategory {
    name
    internalCode
    id
  }
`;

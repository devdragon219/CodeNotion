// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ServiceSubCategoryFragment = {
  __typename?: 'ServiceSubCategory';
  id: number;
  name: string;
  internalCode: string;
};

export const ServiceSubCategoryFragmentDoc = gql`
  fragment ServiceSubCategoryFragment on ServiceSubCategory {
    id
    name
    internalCode
  }
`;

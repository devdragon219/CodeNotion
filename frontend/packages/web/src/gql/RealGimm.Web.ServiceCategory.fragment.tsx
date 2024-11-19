// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ServiceSubCategoryFragmentDoc } from './RealGimm.Web.ServiceSubCategory.fragment';

export type ServiceCategoryFragment = {
  __typename?: 'ServiceCategory';
  id: number;
  name: string;
  internalCode: string;
  subCategories: Array<{ __typename?: 'ServiceSubCategory'; id: number; name: string; internalCode: string }>;
};

export const ServiceCategoryFragmentDoc = gql`
  fragment ServiceCategoryFragment on ServiceCategory {
    id
    name
    internalCode
    subCategories {
      ...ServiceSubCategoryFragment
    }
  }
`;

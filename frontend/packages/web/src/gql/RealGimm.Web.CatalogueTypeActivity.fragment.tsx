// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueTypeActivityFragment = {
  __typename?: 'CatalogueTypeActivity';
  activityType: Types.CatalogueTypeActivityType;
  id: number;
  name: string;
  isMandatoryByLaw: boolean;
};

export const CatalogueTypeActivityFragmentDoc = gql`
  fragment CatalogueTypeActivityFragment on CatalogueTypeActivity {
    activityType
    id
    name
    isMandatoryByLaw
  }
`;

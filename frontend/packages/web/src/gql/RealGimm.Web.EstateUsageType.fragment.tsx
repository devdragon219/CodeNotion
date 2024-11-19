// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type UsageTypeFragment = {
  __typename?: 'EstateUsageType';
  id: number;
  name: string;
  internalCode: string;
  ordering: number;
  isForEstate: boolean;
  isForEstateUnit: boolean;
  isForEstateSubUnit: boolean;
  isForContracts: boolean;
};

export const UsageTypeFragmentDoc = gql`
  fragment UsageTypeFragment on EstateUsageType {
    id
    name
    internalCode
    ordering
    isForEstate
    isForEstateUnit
    isForEstateSubUnit
    isForContracts
  }
`;

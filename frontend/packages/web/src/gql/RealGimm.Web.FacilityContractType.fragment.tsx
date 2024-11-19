// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type FacilityContractTypeFragment = {
  __typename?: 'FcltContractType';
  id: number;
  name: string;
  internalCode: string;
  ordering: number;
};

export const FacilityContractTypeFragmentDoc = gql`
  fragment FacilityContractTypeFragment on FcltContractType {
    id
    name
    internalCode
    ordering
  }
`;

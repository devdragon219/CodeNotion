// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type VatRateFragment = {
  __typename?: 'VATRate';
  id: number;
  internalCode: string;
  description: string;
  type: Types.VatRateType;
  ratePercent: number;
};

export const VatRateFragmentDoc = gql`
  fragment VatRateFragment on VATRate {
    id
    internalCode
    description
    type
    ratePercent
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ReadingValueFragmentDoc } from './RealGimm.Web.ReadingValue.fragment';

export type CostChargeConsumptionFragment = {
  __typename?: 'CostChargeConsumption';
  since: string;
  until: string;
  values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
};

export const CostChargeConsumptionFragmentDoc = gql`
  fragment CostChargeConsumptionFragment on CostChargeConsumption {
    since
    until
    values {
      ...ReadingValueFragment
    }
  }
`;

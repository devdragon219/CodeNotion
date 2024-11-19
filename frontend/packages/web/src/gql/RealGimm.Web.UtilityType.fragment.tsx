// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';

export type UtilityTypeFragment = {
  __typename?: 'UtilityType';
  id: number;
  category: Types.UtilityCategory;
  internalCode: string;
  description: string;
  externalCode?: string | null;
  expenseClass?: string | null;
  measurementUnit: string;
  measurementUnitDescription: string;
  timeOfUseRateCount: number;
  meteringType: Types.MeteringType;
  hasHeatingAccountingSystem: boolean;
};

export type UtilityTypeDetailFragment = {
  __typename?: 'UtilityType';
  category: Types.UtilityCategory;
  description: string;
  internalCode: string;
  expenseClass?: string | null;
  externalCode?: string | null;
  measurementUnit: string;
  measurementUnitDescription: string;
  timeOfUseRateCount: number;
  meteringType: Types.MeteringType;
  hasHeatingAccountingSystem: boolean;
  id: number;
  chargeFields?: Array<
    Array<{
      __typename?: 'UtilityChargeField';
      name: string;
      isMandatory: boolean;
      id: string;
      type: Types.CustomFieldType;
      validValues?: Array<string> | null;
    }>
  > | null;
};

export const UtilityTypeFragmentDoc = gql`
  fragment UtilityTypeFragment on UtilityType {
    id
    category
    internalCode
    description
    externalCode
    expenseClass
    measurementUnit
    measurementUnitDescription
    timeOfUseRateCount
    meteringType
    hasHeatingAccountingSystem
  }
`;
export const UtilityTypeDetailFragmentDoc = gql`
  fragment UtilityTypeDetailFragment on UtilityType {
    category
    description
    internalCode
    expenseClass
    externalCode
    measurementUnit
    measurementUnitDescription
    timeOfUseRateCount
    meteringType
    hasHeatingAccountingSystem
    chargeFields {
      ...UtilityChargeFieldFragment
    }
    id
  }
`;

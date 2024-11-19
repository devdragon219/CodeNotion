// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type ContractTypeFragment = {
  __typename?: 'ContractType';
  id: number;
  internalCode: string;
  description: string;
  isActive: boolean;
  isRentChargeApplicable: boolean;
  nature: Types.AssetNature;
  usageTypeId: number;
  isRegistrationTax: boolean;
  isStampTax: boolean;
  registrationTaxIncomeType?: Types.RegistrationTaxIncomeTypeRli | null;
  registrationTaxPercent?: number | null;
  registrationTaxTenantPercent?: number | null;
  isRevaluationApplicable: boolean;
  isAbsoluteRevaluation: boolean;
  revaluationRatePercent?: number | null;
  revaluationIndexMonth?: number | null;
  revaluationCalculationMonth?: number | null;
  usageType: {
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
};

export const ContractTypeFragmentDoc = gql`
  fragment ContractTypeFragment on ContractType {
    id
    internalCode
    description
    isActive
    isRentChargeApplicable
    nature
    usageTypeId
    usageType {
      ...UsageTypeFragment
    }
    isRegistrationTax
    isStampTax
    registrationTaxIncomeType
    registrationTaxPercent
    registrationTaxTenantPercent
    isRevaluationApplicable
    isAbsoluteRevaluation
    revaluationRatePercent
    revaluationIndexMonth
    revaluationCalculationMonth
  }
`;

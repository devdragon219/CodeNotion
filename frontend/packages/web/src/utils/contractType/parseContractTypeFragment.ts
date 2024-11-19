import { parseMonthIndexToMonth } from '@realgimm5/frontend-common/utils';

import { ContractTypeFragment } from '../../gql/RealGimm.Web.ContractType.fragment';
import { ContractTypeFormInput } from '../../interfaces/FormInputs/ContractType';

export const parseContractTypeToContractTypeFormInput = (
  contractType: ContractTypeFragment,
): ContractTypeFormInput => ({
  contractTypeId: contractType.id,
  internalCode: contractType.internalCode,
  description: contractType.description,
  isActive: contractType.isActive,
  isRentChargeApplicable: contractType.isRentChargeApplicable,
  nature: contractType.nature,
  usageType: contractType.usageType,
  isRegistrationTax: contractType.isRegistrationTax,
  isStampTax: contractType.isStampTax,
  registrationTaxIncomeType: contractType.registrationTaxIncomeType ?? null,
  registrationTaxPercent: contractType.registrationTaxPercent ?? null,
  registrationTaxTenantPercent: contractType.registrationTaxTenantPercent ?? null,
  isRevaluationApplicable: contractType.isRevaluationApplicable,
  isAbsoluteRevaluation: contractType.isAbsoluteRevaluation,
  revaluationCalculationMonth: parseMonthIndexToMonth(contractType.revaluationCalculationMonth),
  revaluationIndexMonth: parseMonthIndexToMonth(contractType.revaluationIndexMonth),
  revaluationRatePercent: contractType.revaluationRatePercent ?? null,
});

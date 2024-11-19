import { ContractTypeInput } from '@realgimm5/frontend-common/gql/types';
import { parseMonthToMonthIndex } from '@realgimm5/frontend-common/utils';

import { ContractTypeFormInput } from '../../interfaces/FormInputs/ContractType';

export const parseContractTypeFormInputToContractTypeInput = (
  contractType: ContractTypeFormInput,
): ContractTypeInput => ({
  id: contractType.contractTypeId,
  internalCode: contractType.internalCode,
  description: contractType.description,
  isActive: contractType.isActive!,
  isRentChargeApplicable: contractType.isRentChargeApplicable,
  nature: contractType.nature!,
  usageTypeId: contractType.usageType!.id,
  isRegistrationTax: contractType.isRegistrationTax,
  isStampTax: contractType.isStampTax,
  registrationTaxIncomeType: contractType.registrationTaxIncomeType!,
  registrationTaxPercent: contractType.registrationTaxPercent,
  registrationTaxTenantPercent: contractType.registrationTaxTenantPercent,
  isRevaluationApplicable: contractType.isRevaluationApplicable,
  isAbsoluteRevaluation: contractType.isAbsoluteRevaluation,
  revaluationCalculationMonth: parseMonthToMonthIndex(contractType.revaluationCalculationMonth),
  revaluationIndexMonth: parseMonthToMonthIndex(contractType.revaluationIndexMonth),
  revaluationRatePercent: contractType.revaluationRatePercent,
});

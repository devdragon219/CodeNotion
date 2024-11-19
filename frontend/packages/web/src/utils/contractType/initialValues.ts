import { ContractTypeFormInput } from '../../interfaces/FormInputs/ContractType';

export const getEmptyContractTypeFormInput = (): ContractTypeFormInput => ({
  contractTypeId: null,
  internalCode: '',
  description: '',
  isActive: null,
  isRentChargeApplicable: false,
  nature: null,
  usageType: null,
  isRegistrationTax: false,
  isStampTax: false,
  registrationTaxIncomeType: null,
  registrationTaxPercent: null,
  registrationTaxTenantPercent: null,
  isRevaluationApplicable: false,
  isAbsoluteRevaluation: false,
  revaluationRatePercent: null,
  revaluationIndexMonth: null,
  revaluationCalculationMonth: null,
});

import { Month } from '@realgimm5/frontend-common/enums';
import { AssetNature, RegistrationTaxIncomeTypeRli } from '@realgimm5/frontend-common/gql/types';

import { UsageTypeFieldValue } from '../FieldValues/UsageType';

export interface ContractTypeFormInput {
  contractTypeId: number | null;
  description: string;
  internalCode: string;
  isAbsoluteRevaluation: boolean;
  isActive: boolean | null;
  isRegistrationTax: boolean;
  isRentChargeApplicable: boolean;
  isRevaluationApplicable: boolean;
  isStampTax: boolean;
  nature: AssetNature | null;
  registrationTaxIncomeType: RegistrationTaxIncomeTypeRli | null;
  registrationTaxPercent: number | null;
  registrationTaxTenantPercent: number | null;
  revaluationIndexMonth: Month | null;
  revaluationCalculationMonth: Month | null;
  revaluationRatePercent: number | null;
  usageType: UsageTypeFieldValue | null;
}

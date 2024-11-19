import { TFunction } from 'i18next';

import { getContractBillingSchema } from './billing';
import { getContractCounterpartsSchema } from './counterparts';
import { getContractDocumentsSchema } from './documents';
import { getContractGeneralDataSchema } from './generalData';
import { getContractLocatedUnitsSchema } from './locatedUnits';
import { getContractOneshotAdditionsSchema } from './oneshotAdditions';
import { getContractRatePlansSchema } from './ratePlans';
import { getContractRecurringAdditionsSchema } from './recurringAdditions';
import { getContractRegistrationTaxSchema } from './registrationTax';
import { getContractRevaluationSchema } from './revaluation';
import { getContractSecurityDepositsSchema } from './securityDeposits';
import { getContractSublocatedDataSchema } from './sublocatedData';
import { getContractTransactorsSchema } from './transactors';

export const getContractSchema = (
  canUseInternalCode: boolean,
  isContractActive: boolean,
  isContractSublocated: boolean,
  language: string,
  t: TFunction,
) =>
  getContractGeneralDataSchema(canUseInternalCode, language, t)
    .concat(getContractSublocatedDataSchema(isContractSublocated, language, t))
    .concat(getContractBillingSchema(language, t))
    .concat(getContractLocatedUnitsSchema(isContractActive, true, t))
    .concat(getContractCounterpartsSchema(isContractActive, true, language, t))
    .concat(getContractTransactorsSchema(isContractActive, language, t))
    .concat(getContractOneshotAdditionsSchema(language, t))
    .concat(getContractRecurringAdditionsSchema(t))
    .concat(getContractSecurityDepositsSchema(language, t))
    .concat(getContractRegistrationTaxSchema(true, language, t))
    .concat(getContractRatePlansSchema(language, t))
    .concat(getContractRevaluationSchema(language, t))
    .concat(getContractDocumentsSchema(language, t));

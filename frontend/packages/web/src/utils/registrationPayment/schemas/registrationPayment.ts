import { TFunction } from 'i18next';

import { getRegistrationPaymentContractSchema } from './contract';
import { getRegistrationPaymentGeneralDataSchema } from './generalData';

export const getRegistrationPaymentSchema = (language: string, t: TFunction) =>
  getRegistrationPaymentContractSchema(t).concat(getRegistrationPaymentGeneralDataSchema(language, t));

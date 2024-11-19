import { MAX_DATE, MAX_YEAR, MIN_DATE, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getRequiredTranslation,
  getYearMaxTranslation,
  getYearMinTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, number, object, string } from 'yup';

export const getRegistrationPaymentGeneralDataSchema = (language: string, t: TFunction) =>
  object().shape({
    paymentCode: string().required(getRequiredTranslation('registration_payment.field.payment_code', t)),
    valueDate: date()
      .required(getRequiredTranslation('registration_payment.field.payment_date', t))
      .min(MIN_DATE, getDateMinTranslation('registration_payment.field.payment_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('registration_payment.field.payment_date', language, t)),
    paymentYear: number()
      .required(getRequiredTranslation('registration_payment.field.payment_year', t))
      .min(MIN_YEAR, getYearMinTranslation('registration_payment.field.payment_year', t))
      .max(MAX_YEAR, getYearMaxTranslation('registration_payment.field.payment_year', t)),
    taxAmount: number().required(getRequiredTranslation('registration_payment.field.tax_amount', t)),
  });

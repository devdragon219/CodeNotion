import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object } from 'yup';

export const getAdministrationTermPaymentSchema = (language: string, t: TFunction) =>
  object().shape({
    installments: array().min(1, getRequiredTranslation('administration_term.field.installment_number', t)),
    paymentDate: date()
      .required(getRequiredTranslation('administration_term.field.payment_date', t))
      .min(MIN_DATE, getDateMinTranslation('administration_term.field.payment_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('administration_term.field.payment_date', language, t)),
  });

export const getAdministrationTermPaymentsSchema = (language: string, t: TFunction) =>
  object().shape({ payments: array().of(getAdministrationTermPaymentSchema(language, t)) });

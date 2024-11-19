import { MAX_YEAR, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { getRequiredTranslation, getYearMaxTranslation, getYearMinTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getRegistrationPaymentRowsSchema = (t: TFunction) =>
  object().shape({
    rows: array().of(
      object().shape({
        paymentRowCode: string().required(getRequiredTranslation('registration_payment.field.row_code', t)),
        referenceYear: number()
          .required(getRequiredTranslation('registration_payment.field.row_year', t))
          .min(MIN_YEAR, getYearMinTranslation('registration_payment.field.row_year', t))
          .max(MAX_YEAR, getYearMaxTranslation('registration_payment.field.row_year', t)),
        amountDue: number().required(getRequiredTranslation('registration_payment.field.row_amount_due', t)),
      }),
    ),
  });

import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object } from 'yup';

export const getContractTakeoverVariationSchema = (language: string, t: TFunction) =>
  object().shape({
    counterparts: array().min(1, t('contract.error.no_subjects')),
    paymentDate: date()
      .required(getRequiredTranslation('contract.field.payment_date', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.payment_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.payment_date', language, t)),
    takeoverLegalRepresentativeSubject: object().required(
      getRequiredTranslation('contract.field.takeover_legal_representative', t),
    ),
  });

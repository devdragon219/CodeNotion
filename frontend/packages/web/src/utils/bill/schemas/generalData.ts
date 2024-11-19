import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getBillGeneralDataSchema = (isBillActive: boolean, t: TFunction) =>
  object().shape({
    year: number().required(getRequiredTranslation('bill.field.year', t)),
    counterpart: object().required(getRequiredTranslation('bill.field.counterpart', t)),
    contractBillingPeriod: string().required(getRequiredTranslation('bill.field.billing_period', t)),
    transactorPaymentType: string().required(getRequiredTranslation('bill.field.payment_type', t)),
    transactor: object().required(
      getRequiredTranslation(`bill.field.${isBillActive ? 'active' : 'passive'}_transactor`, t),
    ),
    emissionType: string().required(getRequiredTranslation('bill.field.emission_type', t)),
  });

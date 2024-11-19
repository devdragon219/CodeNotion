import { TFunction } from 'i18next';
import { object } from 'yup';

export const getRegistrationPaymentContractSchema = (t: TFunction) =>
  object().shape({
    contract: object().required(t('registration_payment.error.no_contract')),
  });

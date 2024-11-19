import { RegistrationPaymentType } from '@realgimm5/frontend-common/gql/types';

import {
  RegistrationPaymentFormInput,
  RegistrationPaymentRowFormInput,
} from '../../interfaces/FormInputs/RegistrationPayment';

export const getEmptyRegistrationPaymentFormInput = (
  paymentType = RegistrationPaymentType.ManualInput,
): RegistrationPaymentFormInput => ({
  contract: null,
  paymentCode: '',
  paymentType,
  paymentYear: null,
  registrationPaymentId: null,
  rows: [],
  sanctionAmount: null,
  taxAmount: null,
  valueDate: null,
});

export const getEmptyRegistrationPaymentRowFormInput = (
  referenceYear: number | null = null,
): RegistrationPaymentRowFormInput => ({
  amountCleared: null,
  amountDue: null,
  paymentRowCode: '',
  paymentRowReceivingEntity: '',
  paymentRowSection: '',
  referencePeriod: null,
  referenceYear,
  registrationPaymentRowId: null,
});

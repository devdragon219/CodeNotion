import { RegistrationPaymentInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { RegistrationPaymentFormInput } from '../../interfaces/FormInputs/RegistrationPayment';

export const parseRegistrationPaymentFormInputToRegistrationPaymentInput = (
  registrationPayment: RegistrationPaymentFormInput,
): RegistrationPaymentInput => ({
  contractId: registrationPayment.contract!.id,
  paymentCode: registrationPayment.paymentCode,
  paymentYear: registrationPayment.paymentYear!,
  rows: registrationPayment.rows.map((row) => ({
    amountCleared: row.amountCleared,
    amountDue: row.amountDue!,
    id: row.registrationPaymentRowId,
    paymentRowCode: row.paymentRowCode,
    paymentRowReceivingEntity: getStringOrNull(row.paymentRowReceivingEntity),
    paymentRowSection: getStringOrNull(row.paymentRowSection),
    referencePeriod: row.referencePeriod,
    referenceYear: row.referenceYear!,
  })),
  sanctionAmount: registrationPayment.sanctionAmount ?? 0,
  taxAmount: registrationPayment.taxAmount!,
  totalAmount: registrationPayment.taxAmount! + (registrationPayment.sanctionAmount ?? 0),
  valueDate: parseDateToString(registrationPayment.valueDate)!,
});

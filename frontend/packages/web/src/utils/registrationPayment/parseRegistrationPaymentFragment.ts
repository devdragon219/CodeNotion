import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { RegistrationPaymentDetailFragment } from '../../gql/RealGimm.Web.RegistrationPayment.fragment';
import { RegistrationPaymentFormInput } from '../../interfaces/FormInputs/RegistrationPayment';

export const parseRegistrationPaymentToRegistrationPaymentFormInput = (
  registrationPayment: RegistrationPaymentDetailFragment,
): RegistrationPaymentFormInput => ({
  contract: {
    id: registrationPayment.contract.id,
    internalCode: registrationPayment.contract.internalCode,
    managementSubjectName: registrationPayment.contract.managementSubject.name,
  },
  paymentCode: registrationPayment.paymentCode,
  paymentType: registrationPayment.paymentType,
  paymentYear: registrationPayment.paymentYear,
  registrationPaymentId: registrationPayment.id,
  rows: registrationPayment.rows.map((row) => ({
    amountCleared: row.amountCleared ?? null,
    amountDue: row.amountDue,
    paymentRowCode: row.paymentRowCode,
    paymentRowReceivingEntity: row.paymentRowReceivingEntity ?? '',
    paymentRowSection: row.paymentRowSection ?? '',
    referencePeriod: row.referencePeriod ?? null,
    referenceYear: row.referenceYear,
    registrationPaymentRowId: row.id,
  })),
  sanctionAmount: registrationPayment.sanctionAmount,
  taxAmount: registrationPayment.taxAmount,
  valueDate: parseStringToDate(registrationPayment.valueDate),
});

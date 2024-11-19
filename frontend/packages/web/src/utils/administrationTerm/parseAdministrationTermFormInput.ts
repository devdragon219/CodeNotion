import { AdministrationTermInput, TermType } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { AdministrationTermFormInput } from '../../interfaces/FormInputs/AdministrationTerm';

export const parseAdministrationTermFormInputToAdministrationTermInput = (
  administrationTermFormInput: AdministrationTermFormInput,
): AdministrationTermInput => ({
  expectedAmount: administrationTermFormInput.expectedAmount!,
  installments: administrationTermFormInput.installments.map((installment) => ({
    amount: Number(installment.amount),
    billItemTypeId: installment.billItemType!.id,
    dueDate: parseDateToString(installment.dueDate)!,
    id: installment.installmentId,
    installmentNumber: installment.installmentNumber,
    notes: installment.notes,
    since: parseDateToString(installment.since)!,
    until: parseDateToString(installment.until)!,
  })),
  name: administrationTermFormInput.name,
  payments: administrationTermFormInput.payments.map((payment) => ({
    billId: payment.billId,
    paymentDate: parseDateToString(payment.paymentDate)!,
    installmentNumbers: payment.installments.map(
      (installment) =>
        administrationTermFormInput.installments.find(({ guid }) => guid === installment)?.installmentNumber ?? 0,
    ),
  })),
  since: parseDateToString(administrationTermFormInput.since)!,
  termType: administrationTermFormInput.termType ?? TermType.Generic,
  until: parseDateToString(administrationTermFormInput.until)!,
});

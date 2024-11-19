import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { AdministrationDetailFragment } from '../../gql/RealGimm.Web.Administration.fragment';
import { AdministrationTermDetailFragment } from '../../gql/RealGimm.Web.AdministrationTerm.fragment';
import { TermGroupedInstallmentPaymentFragment } from '../../gql/RealGimm.Web.TermGroupedInstallmentPayment.fragment';
import { TermInstallmentFragment } from '../../gql/RealGimm.Web.TermInstallment.fragment';
import { AdministrationTermFormInput } from '../../interfaces/FormInputs/AdministrationTerm';
import { AdministrationTermInstallmentFormInput } from '../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../interfaces/FormInputs/AdministrationTermPayment';
import { parseAdministrationToAdministrationFormInput } from '../administration/parseAdministrationFragment';

export const parseAdministrationTermInstallmentToAdministrationTermInstallmentFormInput = (
  installment: TermInstallmentFragment,
): AdministrationTermInstallmentFormInput => ({
  installmentId: installment.id,
  installmentNumber: installment.installmentNumber,
  amount: installment.amount,
  dueDate: parseStringToDate(installment.dueDate),
  since: parseStringToDate(installment.since),
  until: parseStringToDate(installment.until),
  notes: installment.notes ?? '',
  billItemType: installment.billItemType,
  guid: crypto.randomUUID(),
});

export const parseTermGroupedInstallmentPaymentToAdministrationTermInstallmentFormInput = (
  payment: TermGroupedInstallmentPaymentFragment,
  installments: AdministrationTermInstallmentFormInput[],
): AdministrationTermPaymentFormInput => ({
  billId: payment.billId,
  installments: payment.termInstallments.map(
    (installment) => installments.find(({ installmentId }) => installmentId === installment.id)?.guid ?? '',
  ),
  paymentDate: parseStringToDate(payment.billDate),
  billInternalCode: payment.billInternalCode,
  isBillTemporary: payment.billIsTemporary,
});

export const parseAdministrationTermToAdministrationTermFormInput = (
  administrationTerm: AdministrationTermDetailFragment,
): AdministrationTermFormInput => {
  const installments = administrationTerm.installments.map((installment) =>
    parseAdministrationTermInstallmentToAdministrationTermInstallmentFormInput(installment),
  );

  return {
    administration: parseAdministrationToAdministrationFormInput(
      administrationTerm.administration as AdministrationDetailFragment,
    ),
    administrationTermId: administrationTerm.id,
    expectedAmount: administrationTerm.expectedAmount,
    installments,
    payments: administrationTerm.payments.map((payment) =>
      parseTermGroupedInstallmentPaymentToAdministrationTermInstallmentFormInput(payment, installments),
    ),
    name: administrationTerm.name,
    since: parseStringToDate(administrationTerm.since),
    termType: administrationTerm.termType,
    until: parseStringToDate(administrationTerm.until),
  };
};

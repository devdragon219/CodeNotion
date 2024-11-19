import { AdministrationTermFormInput } from '../../interfaces/FormInputs/AdministrationTerm';
import { AdministrationTermInstallmentFormInput } from '../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../interfaces/FormInputs/AdministrationTermPayment';
import { getEmptyAdministrationFormInput } from '../administration/initialValues';

export const getEmptyAdministrationTermFormInput = (): AdministrationTermFormInput => ({
  administration: getEmptyAdministrationFormInput(),
  administrationTermId: null,
  installments: [getEmptyAdministrationTermInstallmentFormInput(1)],
  payments: [],
  expectedAmount: null,
  name: '',
  since: null,
  termType: null,
  until: null,
});

export const getEmptyAdministrationTermInstallmentFormInput = (
  installmentNumber: number,
): AdministrationTermInstallmentFormInput => ({
  installmentId: null,
  amount: null,
  billItemType: null,
  dueDate: null,
  installmentNumber,
  notes: '',
  since: null,
  until: null,
  guid: crypto.randomUUID(),
});

export const getEmptyAdministrationTermPaymentFormInput = (): AdministrationTermPaymentFormInput => ({
  billId: null,
  installments: [],
  paymentDate: null,
  billInternalCode: '',
  isBillTemporary: true,
});

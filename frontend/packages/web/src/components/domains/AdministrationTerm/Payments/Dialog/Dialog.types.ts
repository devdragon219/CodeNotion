import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermPayment';

export interface AdministrationTermPaymentsDialogInput {
  payment: AdministrationTermPaymentFormInput;
  index: number;
}

export interface AdministrationTermPaymentsDialogProps {
  input?: AdministrationTermPaymentsDialogInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: AdministrationTermPaymentFormInput[] | AdministrationTermPaymentsDialogInput) => void;
  installments: AdministrationTermInstallmentFormInput[];
  existingPayments?: AdministrationTermPaymentFormInput[];
}

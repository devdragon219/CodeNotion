import { RegistrationPaymentRowFormInput } from '../../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentRowDialogInput {
  row: RegistrationPaymentRowFormInput;
  index: number;
}

export interface RegistrationPaymentRowDialogProps {
  input?: RegistrationPaymentRowDialogInput;
  referenceYear: number | null;
  onClose: () => void;
  onSave: (value: RegistrationPaymentRowFormInput[] | RegistrationPaymentRowDialogInput) => void;
}

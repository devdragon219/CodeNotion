import { RegistrationPaymentFormInput } from '../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentCreateDialogProps {
  onClose: () => void;
  onSave: (registrationPayment: RegistrationPaymentFormInput) => void;
}

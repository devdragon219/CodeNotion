import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentRecapStepProps {
  registrationPayment: RegistrationPaymentFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (registrationPayment: RegistrationPaymentFormInput) => void;
}

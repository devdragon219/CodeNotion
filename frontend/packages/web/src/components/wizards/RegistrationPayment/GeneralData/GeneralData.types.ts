import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentGeneralDataStepProps {
  registrationPayment: RegistrationPaymentFormInput;
  onBack: () => void;
  onChange: (registrationPayment: RegistrationPaymentFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

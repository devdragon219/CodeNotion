import { ContractFragment } from '../../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentContractsStepProps {
  registrationPayment: RegistrationPaymentFormInput;
  onChange: (registrationPayment: RegistrationPaymentFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onShowAllLocatedUnits: (contract: ContractFragment) => void;
}

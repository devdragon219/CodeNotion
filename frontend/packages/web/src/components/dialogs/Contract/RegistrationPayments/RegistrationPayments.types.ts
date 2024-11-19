import { ContractRegistrationPaymentFragment } from '../../../../gql/RealGimm.Web.RegistrationPayment.fragment';

export interface ContractRegistrationPaymentsDialogProps {
  registrationPayments: ContractRegistrationPaymentFragment[];
  onClose: () => void;
}

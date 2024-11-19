import { CadastralUnitTaxPaymentFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitTaxDownPaymentsDialogProps {
  taxPayment: CadastralUnitTaxPaymentFormInput | null;
  onClose: () => void;
}

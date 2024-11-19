import { AdministrationTermInstallmentFormInput } from '../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../../../interfaces/FormInputs/AdministrationTermPayment';

export interface AdministrationTermInstallmentsTableProps {
  installments: AdministrationTermInstallmentFormInput[];
  payments?: AdministrationTermPaymentFormInput[];
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
}

import { AdministrationTermInstallmentFormInput } from '../../../../interfaces/FormInputs/AdministrationTermInstallment';

export interface AdministrationTermTableInstallmentsDialogProps {
  installments: AdministrationTermInstallmentFormInput[];
  onClose: () => void;
}

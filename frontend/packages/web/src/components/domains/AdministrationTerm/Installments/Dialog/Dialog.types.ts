import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';

export interface AdministrationTermInstallmentsDialogInput {
  installment: AdministrationTermInstallmentFormInput;
  index: number;
}

export interface AdministrationTermInstallmentsDialogProps {
  input?: AdministrationTermInstallmentsDialogInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: AdministrationTermInstallmentFormInput[] | AdministrationTermInstallmentsDialogInput) => void;
  termSince: Date | null;
  termUntil: Date | null;
  termExpectedAmount: number;
  existingInstallments: AdministrationTermInstallmentFormInput[];
}

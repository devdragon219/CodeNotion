import { BillRowFormInput } from '../../../../../interfaces/FormInputs/Bill';

export interface BillRowDialogInput {
  billRow: BillRowFormInput;
  index: number;
}

export interface BillRowDialogProps {
  input?: BillRowDialogInput;
  onClose: () => void;
  onSave: (value: BillRowFormInput[] | BillRowDialogInput) => void;
}

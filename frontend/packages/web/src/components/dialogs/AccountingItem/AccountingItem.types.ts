import { AccountingItemFormInput } from '../../../interfaces/FormInputs/AccountingItem';

export interface AccountingItemDialogProps {
  input?: AccountingItemFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: AccountingItemFormInput) => void;
}

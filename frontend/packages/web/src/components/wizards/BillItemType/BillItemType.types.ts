import { BillItemTypeFormInput } from '../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeCreateDialogProps {
  onClose: () => void;
  onSave: (billItemType: BillItemTypeFormInput) => void;
}

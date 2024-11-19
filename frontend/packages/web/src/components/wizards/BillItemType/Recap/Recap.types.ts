import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeRecapStepProps {
  billItemType: BillItemTypeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (billItemType: BillItemTypeFormInput) => void;
}

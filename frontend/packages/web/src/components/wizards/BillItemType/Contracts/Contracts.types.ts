import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeContractsStepProps {
  billItemType: BillItemTypeFormInput;
  onChange: (billItemType: BillItemTypeFormInput) => void;
  onBack: () => void;
  onError: () => void;
  onNext: () => void;
}

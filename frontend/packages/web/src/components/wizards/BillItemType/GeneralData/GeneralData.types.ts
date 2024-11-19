import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeGeneralDataStepProps {
  billItemType: BillItemTypeFormInput;
  canUseInternalCode: boolean;
  onChange: (billItemType: BillItemTypeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

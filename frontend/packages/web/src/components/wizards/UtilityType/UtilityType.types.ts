import { UtilityTypeFormInput } from '../../../interfaces/FormInputs/UtilityType';

export interface UtilityTypeCreateDialogProps {
  onClose: () => void;
  onSave: (utilityType: UtilityTypeFormInput) => void;
}

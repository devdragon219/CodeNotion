import { UtilityServiceFormInput } from '../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceCreateDialogProps {
  currentEstates?: UtilityServiceFormInput['estates'];
  onClose: () => void;
  onSave: (utilityService: UtilityServiceFormInput) => void;
}

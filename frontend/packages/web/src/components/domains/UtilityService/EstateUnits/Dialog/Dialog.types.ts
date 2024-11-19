import { UtilityServiceFormInput } from '../../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceEstateUnitsDialogProps {
  currentEstateUnits: UtilityServiceFormInput['estateUnits'];
  currentEstates: UtilityServiceFormInput['estates'];
  onClose: () => void;
  onSave: (utilityService: UtilityServiceFormInput) => void;
}

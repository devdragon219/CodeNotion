import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceRecapStepProps {
  utilityService: UtilityServiceFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (utilityService: UtilityServiceFormInput) => void;
}

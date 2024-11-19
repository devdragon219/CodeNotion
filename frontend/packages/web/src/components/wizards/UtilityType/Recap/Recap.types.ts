import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';

export interface UtilityTypeRecapStepProps {
  utilityType: UtilityTypeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (utilityType: UtilityTypeFormInput) => void;
}

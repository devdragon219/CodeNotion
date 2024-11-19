import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceEstateUnitsStepProps {
  utilityService: UtilityServiceFormInput;
  onBack: () => void;
  onChange: (utilityService: UtilityServiceFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

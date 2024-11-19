import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceEstateStepProps {
  currentEstates?: UtilityServiceFormInput['estates'];
  utilityService: UtilityServiceFormInput;
  onBack: () => void;
  onChange: (utilityService: UtilityServiceFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

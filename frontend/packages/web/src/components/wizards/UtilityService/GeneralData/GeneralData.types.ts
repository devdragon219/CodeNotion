import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceGeneralDataStepProps {
  canUseInternalCode: boolean;
  utilityService: UtilityServiceFormInput;
  onChange: (utilityService: UtilityServiceFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

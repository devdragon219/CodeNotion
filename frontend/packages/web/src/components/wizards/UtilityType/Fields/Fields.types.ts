import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';

export interface UtilityTypeFieldsStepProps {
  utilityType: UtilityTypeFormInput;
  onBack: () => void;
  onChange: (utilityType: UtilityTypeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

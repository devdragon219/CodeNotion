import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';

export interface UtilityTypeGeneralDataStepProps {
  canUseInternalCode: boolean;
  utilityType: UtilityTypeFormInput;
  onChange: (utilityType: UtilityTypeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

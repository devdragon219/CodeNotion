import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateGeneralDataStepProps {
  canUseInternalCode: boolean;
  estate: EstateFormInput;
  onAddFloor: (onComplete: () => void) => void;
  onChange: (estate: EstateFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

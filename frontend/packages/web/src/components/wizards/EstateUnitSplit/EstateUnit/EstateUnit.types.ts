import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitSplitEstateUnitStepProps {
  alreadyInUseInternalCodes: string[];
  estateUnit: EstateUnitFormInput;
  minDate?: Date;
  onBack: () => void;
  onChange: (estateUnit: EstateUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

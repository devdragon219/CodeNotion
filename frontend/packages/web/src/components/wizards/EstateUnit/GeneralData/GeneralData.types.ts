import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitGeneralDataStepProps {
  estateUnit: EstateUnitFormInput;
  onBack: () => void;
  onChange: (estateUnit: EstateUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

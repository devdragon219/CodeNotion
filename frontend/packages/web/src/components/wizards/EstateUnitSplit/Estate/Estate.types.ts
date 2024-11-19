import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitSplitEstateStepProps {
  cityName: string;
  estateId: number;
  estateUnit: EstateUnitFormInput;
  onChange: (estateUnit: EstateUnitFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

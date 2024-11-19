import { EstateUnitSplitFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitSplitEstateUnitStepProps {
  estateUnitId?: number;
  estateUnitSplit: EstateUnitSplitFormInput;
  onChange: (estateUnitSplit: EstateUnitSplitFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

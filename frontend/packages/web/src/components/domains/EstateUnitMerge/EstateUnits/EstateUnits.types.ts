import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitMergeEstateUnitsStepProps {
  estateUnitId?: number;
  estateUnitMerge: EstateUnitMergeFormInput;
  onChange: (estateUnitMerge: EstateUnitMergeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

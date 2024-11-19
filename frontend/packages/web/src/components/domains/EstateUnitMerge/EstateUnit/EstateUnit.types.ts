import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitMergeEstateUnitStepProps {
  estateUnitMerge: EstateUnitMergeFormInput;
  onBack: () => void;
  onChange: (estateUnitMerge: EstateUnitMergeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

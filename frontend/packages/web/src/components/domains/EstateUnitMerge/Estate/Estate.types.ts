import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitMergeEstateStepProps {
  estateUnitMerge: EstateUnitMergeFormInput;
  onBack: () => void;
  onChange: (estateUnitMerge: EstateUnitMergeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

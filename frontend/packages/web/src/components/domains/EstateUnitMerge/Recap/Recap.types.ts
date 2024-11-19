import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitMergeRecapStepProps {
  estateUnitMerge: EstateUnitMergeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (estateUnitMerge: EstateUnitMergeFormInput) => void;
}

import { EstateUnitSplitFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitSplitRecapStepProps {
  estateUnitSplit: EstateUnitSplitFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (estateUnitSplit: EstateUnitSplitFormInput) => void;
}

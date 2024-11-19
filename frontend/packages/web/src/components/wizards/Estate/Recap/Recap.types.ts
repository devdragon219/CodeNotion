import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateRecapStepProps {
  estate: EstateFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (estate: EstateFormInput) => void;
}

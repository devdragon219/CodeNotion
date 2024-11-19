import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitRecapStepProps {
  estateUnit: EstateUnitFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (estateUnit: EstateUnitFormInput) => void;
}

import { EstateUnitTransformFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitTransformRecapStepProps {
  estateUnitTransform: EstateUnitTransformFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (estateUnitTransform: EstateUnitTransformFormInput) => void;
}

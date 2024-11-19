import { EstateUnitTransformFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitTransformCadastralCoordinatesStepProps {
  estateUnitTransform: EstateUnitTransformFormInput;
  onBack: () => void;
  onChange: (estateUnitTransform: EstateUnitTransformFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

import { EstateUnitMergeFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitMergeCadastralCoordinatesStepProps {
  estateUnitMerge: EstateUnitMergeFormInput;
  onBack: () => void;
  onChange: (estateUnitMerge: EstateUnitMergeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

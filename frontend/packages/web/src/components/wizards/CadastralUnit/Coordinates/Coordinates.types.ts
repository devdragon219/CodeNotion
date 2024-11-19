import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitCoordinatesStepProps {
  cadastralUnit: CadastralUnitFormInput;
  onBack: () => void;
  onChange: (cadastralUnit: CadastralUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

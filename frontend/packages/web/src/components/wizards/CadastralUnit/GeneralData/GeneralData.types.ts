import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitGeneralDataStepProps {
  cadastralUnit: CadastralUnitFormInput;
  onBack: () => void;
  onChange: (cadastralUnit: CadastralUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

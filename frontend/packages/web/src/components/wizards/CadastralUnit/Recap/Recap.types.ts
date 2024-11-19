import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitRecapStepProps {
  cadastralUnit: CadastralUnitFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (cadastralUnit: CadastralUnitFormInput) => void;
}

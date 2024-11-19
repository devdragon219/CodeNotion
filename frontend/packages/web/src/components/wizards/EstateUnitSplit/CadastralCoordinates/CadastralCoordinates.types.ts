import { TableState } from '@tanstack/react-table';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitSplitCadastralCoordinatesStepProps {
  estateUnit: EstateUnitFormInput;
  onBack: () => void;
  onChange: (estateUnit: EstateUnitFormInput) => void;
  onError: () => void;
  onSave: (estateUnit: EstateUnitFormInput, initialState: Partial<TableState>) => void;
}

import { TableState } from '@tanstack/react-table';

import { EstateUnitTransformFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitTransformEstateStepProps {
  estateUnitTransform: EstateUnitTransformFormInput;
  initialState: Partial<TableState>;
  onBack: () => void;
  onChange: (estateUnitTransform: EstateUnitTransformFormInput) => void;
  onChangeInitialState: (initialState: Partial<TableState>) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

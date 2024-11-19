import { TableState } from '@tanstack/react-table';

import { EstateUnitTransformFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitTransformFromEstateUnitStepProps {
  estateUnitId?: number;
  estateUnitTransform: EstateUnitTransformFormInput;
  initialState: Partial<TableState>;
  onChange: (estateUnitTransform: EstateUnitTransformFormInput) => void;
  onChangeInitialState: (initialState: Partial<TableState>) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

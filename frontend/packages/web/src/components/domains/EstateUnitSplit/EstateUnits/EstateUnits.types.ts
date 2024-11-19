import { TableState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

import { EstateUnitSplitFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';

export interface EstateUnitSplitEstateUnitsStepProps {
  estateUnitSplit: EstateUnitSplitFormInput;
  initialStates: Partial<TableState>[];
  onBack: () => void;
  onChange: (estateUnitSplit: EstateUnitSplitFormInput) => void;
  onChangeInitialStates: Dispatch<SetStateAction<Partial<TableState>[]>>;
  onError: (message?: string) => void;
  onNext: () => void;
}

import { TableState } from '@tanstack/react-table';

import { EstateUnitFormInput } from '../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitSplitDialogInput {
  estateUnit: EstateUnitFormInput;
  index: number;
  initialState: Partial<TableState>;
}

export interface EstateUnitSplitDialogProps {
  alreadyInUseInternalCodes: string[];
  cadastralUnitMinDate?: Date;
  cityName: string;
  estateId: number;
  estateUnitMinDate?: Date;
  input?: EstateUnitSplitDialogInput;
  onClose: () => void;
  onSave: (value: EstateUnitFormInput | EstateUnitSplitDialogInput, initialState: Partial<TableState>) => void;
}

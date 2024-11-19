import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { FunctionAreasFieldValues } from '../../../../interfaces/FormInputs/FunctionArea';

export interface FunctionAreaFieldProps {
  control: Control<FunctionAreasFieldValues>;
  errors: FieldErrors<FunctionAreasFieldValues>;
  index: number;
  internalCodes: string[];
  mode: FormMode;
  readonly?: boolean;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<FunctionAreasFieldValues>;
}

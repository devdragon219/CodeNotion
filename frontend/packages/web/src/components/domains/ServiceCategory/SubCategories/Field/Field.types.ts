import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ServiceCategoryFormInput } from '../../../../../interfaces/FormInputs/ServiceCategory';

export interface SubCategoryFieldProps {
  control: Control<ServiceCategoryFormInput>;
  errors: FieldErrors<ServiceCategoryFormInput>;
  existingInternalCodes?: string[];
  index: number;
  internalCodes: string[];
  mode: FormMode;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<ServiceCategoryFormInput>;
}

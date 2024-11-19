import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';

export interface ServiceCategorySubCategoriesProps {
  canUseInternalCodes: Record<string, boolean>;
  control: Control<ServiceCategoryFormInput>;
  errors: FieldErrors<ServiceCategoryFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<ServiceCategoryFormInput>;
}

import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';

export interface SubCategoryFieldProps {
  control: Control<CatalogueCategoryFormInput>;
  errors: FieldErrors<CatalogueCategoryFormInput>;
  existingInternalCodes?: string[];
  index: number;
  internalCodes: string[];
  mode: FormMode;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<CatalogueCategoryFormInput>;
}

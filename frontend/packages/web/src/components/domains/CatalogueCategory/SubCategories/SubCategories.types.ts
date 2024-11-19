import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategorySubCategoriesProps {
  canUseInternalCodes: Record<string, boolean>;
  control: Control<CatalogueCategoryFormInput>;
  errors: FieldErrors<CatalogueCategoryFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<CatalogueCategoryFormInput>;
}

import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueItemsProps {
  canUseInternalCodes: Record<string, boolean>;
  control: Control<CatalogueFormInput>;
  errors: FieldErrors<CatalogueFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<CatalogueFormInput>;
}

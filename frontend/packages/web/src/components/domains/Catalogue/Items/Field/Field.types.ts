import { FormMode } from '@realgimm5/frontend-common/enums';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../../interfaces/FormInputs/Catalogue';

export interface ItemFieldProps {
  control: Control<CatalogueFormInput>;
  errors: FieldErrors<CatalogueFormInput>;
  existingInternalCodes?: string[];
  index: number;
  internalCodes: string[];
  mode: FormMode;
  useGetInternalCode: boolean;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
  setValue: UseFormSetValue<CatalogueFormInput>;
}

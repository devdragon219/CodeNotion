import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';

export interface CategoryFieldProps {
  control: Control<CatalogueTypeFormInput>;
  errors: FieldErrors<CatalogueTypeFormInput>;
  readonly?: boolean;
  onAddCatalogueCategory: (onComplete: () => void) => void;
  setValue: UseFormSetValue<CatalogueTypeFormInput>;
}

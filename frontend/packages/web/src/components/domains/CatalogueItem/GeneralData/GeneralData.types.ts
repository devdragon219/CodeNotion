import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueItemFormInput } from '../../../../interfaces/FormInputs/CatalogueItem';

export interface CatalogueItemGeneralDataProps {
  control: Control<CatalogueItemFormInput>;
  errors: FieldErrors<CatalogueItemFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<CatalogueItemFormInput>;
}

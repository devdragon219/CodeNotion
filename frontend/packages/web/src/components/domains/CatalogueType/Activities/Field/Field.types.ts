import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';

export interface ActivityFieldProps {
  control: Control<CatalogueTypeFormInput>;
  errors: FieldErrors<CatalogueTypeFormInput>;
  index: number;
  readonly?: boolean;
}

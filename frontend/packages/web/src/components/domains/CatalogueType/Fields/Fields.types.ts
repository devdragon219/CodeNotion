import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeFieldsProps {
  control: Control<CatalogueTypeFormInput>;
  errors: FieldErrors<CatalogueTypeFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

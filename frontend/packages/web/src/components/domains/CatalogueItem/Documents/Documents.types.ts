import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueItemFormInput } from '../../../../interfaces/FormInputs/CatalogueItem';

export interface CatalogueItemDocumentsProps {
  control: Control<CatalogueItemFormInput>;
  errors: FieldErrors<CatalogueItemFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

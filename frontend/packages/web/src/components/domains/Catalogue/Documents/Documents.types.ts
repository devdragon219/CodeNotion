import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueDocumentsProps {
  control: Control<CatalogueFormInput>;
  errors: FieldErrors<CatalogueFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

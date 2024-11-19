import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueGeneralDataProps {
  control: Control<CatalogueFormInput>;
  errors: FieldErrors<CatalogueFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<CatalogueFormInput>;
}

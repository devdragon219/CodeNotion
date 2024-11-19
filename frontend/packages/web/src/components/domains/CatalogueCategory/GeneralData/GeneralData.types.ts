import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategoryGeneralDataProps {
  control: Control<CatalogueCategoryFormInput>;
  errors: FieldErrors<CatalogueCategoryFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import {
  CatalogueTypeCatalogueCategoryFormInput,
  CatalogueTypeFormInput,
} from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeGeneralDataProps {
  control: Control<CatalogueTypeFormInput>;
  errors: FieldErrors<CatalogueTypeFormInput>;
  mode: FormMode;
  readonly?: boolean;
  onAddCatalogueCategory: (onComplete: () => void) => void;
  onAddCatalogueSubCategory: (input: CatalogueTypeCatalogueCategoryFormInput) => void;
  setValue: UseFormSetValue<CatalogueTypeFormInput>;
}

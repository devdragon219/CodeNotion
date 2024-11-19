import { Control, FieldErrors } from 'react-hook-form';

import {
  CatalogueTypeCatalogueCategoryFormInput,
  CatalogueTypeFormInput,
} from '../../../../../interfaces/FormInputs/CatalogueType';

export interface SubCategoryFieldProps {
  control: Control<CatalogueTypeFormInput>;
  errors: FieldErrors<CatalogueTypeFormInput>;
  readonly?: boolean;
  onAddCatalogueSubCategory: (input: CatalogueTypeCatalogueCategoryFormInput) => void;
}

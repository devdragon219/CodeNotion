import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CatalogueSubCategoryFilterInput } from '@realgimm5/frontend-common/gql/types';

import { CatalogueSubCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueSubCategoryFieldProps
  extends Omit<AutocompleteFieldProps<CatalogueSubCategoryFormInput>, SpecializedAutocompleteOmits> {
  catalogueCategoryId?: number | null;
  where?: CatalogueSubCategoryFilterInput;
}

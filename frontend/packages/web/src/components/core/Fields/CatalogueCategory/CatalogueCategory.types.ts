import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CatalogueCategoryFilterInput } from '@realgimm5/frontend-common/gql/types';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategoryFieldProps
  extends Omit<AutocompleteFieldProps<CatalogueCategoryFormInput>, SpecializedAutocompleteOmits> {
  where?: CatalogueCategoryFilterInput;
}

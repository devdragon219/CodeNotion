import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CatalogueTypeFilterInput } from '@realgimm5/frontend-common/gql/types';

import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeFieldProps
  extends Omit<AutocompleteFieldProps<CatalogueTypeFormInput>, SpecializedAutocompleteOmits> {
  where?: CatalogueTypeFilterInput;
}

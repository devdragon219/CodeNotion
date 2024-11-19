import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CatalogueItemFilterInput } from '@realgimm5/frontend-common/gql/types';

import { CatalogueItemFieldValue } from '../../../../interfaces/FieldValues/CatalogueItem';

export interface CatalogueItemFieldProps<Multiple extends boolean | undefined = undefined>
  extends Omit<AutocompleteFieldProps<CatalogueItemFieldValue, Multiple>, SpecializedAutocompleteOmits> {
  multiple?: Multiple;
  where?: CatalogueItemFilterInput;
}

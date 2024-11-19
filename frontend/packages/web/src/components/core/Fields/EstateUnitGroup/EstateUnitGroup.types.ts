import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { EstateUnitGroupFieldValue } from '../../../../interfaces/FieldValues/EstateUnitGroup';

export type EstateUnitGroupFieldProps = Omit<
  AutocompleteFieldProps<EstateUnitGroupFieldValue>,
  SpecializedAutocompleteOmits
>;

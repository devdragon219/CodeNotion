import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { CityFieldValue } from '../../../../interfaces/FieldValues/City';

export interface CityFieldProps extends Omit<AutocompleteFieldProps<CityFieldValue>, SpecializedAutocompleteOmits> {
  countryISO?: string | null;
}

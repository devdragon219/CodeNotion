import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

export type CountryISOFieldProps = Omit<AutocompleteFieldProps<string>, SpecializedAutocompleteOmits>;

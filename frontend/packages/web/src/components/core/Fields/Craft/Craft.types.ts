import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { CraftFieldValue } from '../../../../interfaces/FieldValues/Craft';

export type CraftFieldProps = Omit<AutocompleteFieldProps<CraftFieldValue>, SpecializedAutocompleteOmits>;

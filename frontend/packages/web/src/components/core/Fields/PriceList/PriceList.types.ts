import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { PriceListFieldValue } from '../../../../interfaces/FieldValues/PriceList';

export type PriceListFieldProps = Omit<AutocompleteFieldProps<PriceListFieldValue>, SpecializedAutocompleteOmits>;

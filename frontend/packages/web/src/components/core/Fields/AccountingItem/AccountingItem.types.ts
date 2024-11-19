import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { AccountingItemFieldValue } from '../../../../interfaces/FieldValues/AccountingItem';

export type AccountingItemFieldProps = Omit<
  AutocompleteFieldProps<AccountingItemFieldValue>,
  SpecializedAutocompleteOmits
>;

import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { VatRateType } from '@realgimm5/frontend-common/gql/types';

import { VatRateFieldValue } from '../../../../interfaces/FieldValues/VatRate';

export interface VatRateFieldProps
  extends Omit<AutocompleteFieldProps<VatRateFieldValue>, SpecializedAutocompleteOmits> {
  vatRateType?: VatRateType | null;
}

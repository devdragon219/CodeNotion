import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { BillItemTypeFieldValue } from '../../../../interfaces/FieldValues/BillIemType';

export interface BillItemTypeFieldProps
  extends Omit<AutocompleteFieldProps<BillItemTypeFieldValue>, SpecializedAutocompleteOmits> {
  isForContractFee?: boolean;
}

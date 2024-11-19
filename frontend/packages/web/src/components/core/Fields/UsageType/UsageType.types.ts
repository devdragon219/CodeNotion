import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { UsageTypeFieldValue } from '../../../../interfaces/FieldValues/UsageType';

export interface UsageTypeFieldProps<Multiple extends boolean | undefined = undefined>
  extends Omit<AutocompleteFieldProps<UsageTypeFieldValue, Multiple>, SpecializedAutocompleteOmits> {
  isFor?: 'contracts' | 'estate' | 'estateUnit' | 'estateSubUnit';
  multiple?: Multiple;
}

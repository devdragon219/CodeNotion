import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { UserFilterInput } from '@realgimm5/frontend-common/gql/types';

import { UserFieldValue } from '../../../../interfaces/FieldValues/User';

export interface UserFieldProps extends Omit<AutocompleteFieldProps<UserFieldValue>, SpecializedAutocompleteOmits> {
  where?: UserFilterInput;
}

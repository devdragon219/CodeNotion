import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { WorkTeamFilterInput } from '@realgimm5/frontend-common/gql/types';

import { WorkTeamFieldValue } from '../../../../interfaces/FieldValues/WorkTeam';

export interface WorkTeamFieldProps
  extends Omit<AutocompleteFieldProps<WorkTeamFieldValue>, SpecializedAutocompleteOmits> {
  where?: WorkTeamFilterInput;
}

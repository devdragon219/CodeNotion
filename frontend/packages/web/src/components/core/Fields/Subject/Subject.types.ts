import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { SubjectFilterInput } from '@realgimm5/frontend-common/gql/types';

import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';

export interface SubjectFieldProps<Multiple extends boolean | undefined = undefined>
  extends Omit<AutocompleteFieldProps<SubjectFieldValue, Multiple>, SpecializedAutocompleteOmits> {
  multiple?: Multiple;
  where?: SubjectFilterInput;
}

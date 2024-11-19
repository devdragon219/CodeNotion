import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { InterventionTypeFieldValue } from '../../../../interfaces/FieldValues/InterventionType';

export type InterventionTypeFieldProps = Omit<
  AutocompleteFieldProps<InterventionTypeFieldValue>,
  SpecializedAutocompleteOmits
>;

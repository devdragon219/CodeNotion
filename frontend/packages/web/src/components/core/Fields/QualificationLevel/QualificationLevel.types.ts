import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { QualificationLevelFieldValue } from '../../../../interfaces/FieldValues/QualificationLevel';

export type QualificationLevelFieldProps = Omit<
  AutocompleteFieldProps<QualificationLevelFieldValue>,
  SpecializedAutocompleteOmits
>;

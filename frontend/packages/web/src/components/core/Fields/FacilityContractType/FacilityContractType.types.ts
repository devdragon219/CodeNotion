import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';

import { FacilityContractTypeFieldValue } from '../../../../interfaces/FieldValues/FacilityContractType';

export type FacilityContractTypeFieldProps = Omit<
  AutocompleteFieldProps<FacilityContractTypeFieldValue>,
  SpecializedAutocompleteOmits
>;

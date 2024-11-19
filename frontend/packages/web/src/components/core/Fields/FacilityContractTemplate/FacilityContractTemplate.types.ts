import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { ContractTemplateFilterInput } from '@realgimm5/frontend-common/gql/types';

import { FacilityContractTemplateFieldValue } from '../../../../interfaces/FieldValues/FacilityContractTemplate';

export interface FacilityContractTemplateFieldProps
  extends Omit<AutocompleteFieldProps<FacilityContractTemplateFieldValue>, SpecializedAutocompleteOmits> {
  where?: ContractTemplateFilterInput;
}

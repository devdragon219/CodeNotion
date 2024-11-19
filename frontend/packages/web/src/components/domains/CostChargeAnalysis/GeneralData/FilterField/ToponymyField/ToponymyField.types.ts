import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisAddressFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisToponymyFieldProps
  extends Omit<AutocompleteFieldProps<CostChargeAnalysisAddressFilterValue>, SpecializedAutocompleteOmits> {
  filters: CostChargeAnalysisFiltersInput;
}

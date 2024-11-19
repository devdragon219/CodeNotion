import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisUtilityServiceFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisUtilityServicesFieldProps
  extends Omit<
    AutocompleteFieldProps<CostChargeAnalysisUtilityServiceFilterValue, true>,
    SpecializedAutocompleteOmits
  > {
  filters: CostChargeAnalysisFiltersInput;
}

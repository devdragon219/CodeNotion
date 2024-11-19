import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisUtilityTypeFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisUtilityTypesFieldProps
  extends Omit<AutocompleteFieldProps<CostChargeAnalysisUtilityTypeFilterValue, true>, SpecializedAutocompleteOmits> {
  filters: CostChargeAnalysisFiltersInput;
}

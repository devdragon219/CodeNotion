import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisEstateFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisEstatesFieldProps
  extends Omit<AutocompleteFieldProps<CostChargeAnalysisEstateFilterValue, true>, SpecializedAutocompleteOmits> {
  filters: CostChargeAnalysisFiltersInput;
}

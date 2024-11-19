import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisCountyFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisCountyFieldProps
  extends Omit<AutocompleteFieldProps<CostChargeAnalysisCountyFilterValue>, SpecializedAutocompleteOmits> {
  filters: CostChargeAnalysisFiltersInput;
}

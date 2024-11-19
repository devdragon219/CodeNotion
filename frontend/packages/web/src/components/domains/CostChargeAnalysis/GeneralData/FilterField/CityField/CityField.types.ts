import { AutocompleteFieldProps, SpecializedAutocompleteOmits } from '@realgimm5/frontend-common/components';
import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisCityFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisCityFieldProps
  extends Omit<AutocompleteFieldProps<CostChargeAnalysisCityFilterValue>, SpecializedAutocompleteOmits> {
  filters: CostChargeAnalysisFiltersInput;
}

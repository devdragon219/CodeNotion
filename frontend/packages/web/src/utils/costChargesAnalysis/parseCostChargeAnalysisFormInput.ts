import { CostChargeAnalysisFiltersInput } from '@realgimm5/frontend-common/gql/types';

import { CostChargeAnalysisFilterType } from '../../enums/CostChargeAnalysisFilterType';
import { CostChargeAnalysisFormInput } from '../../interfaces/FormInputs/CostChargeAnalysis';

export const parseCostChargeAnalysisFormInputToCostChargeAnalysisFiltersInput = (
  costChargesAnalysis: CostChargeAnalysisFormInput,
): CostChargeAnalysisFiltersInput =>
  costChargesAnalysis.filters.reduce((acc, filter) => {
    if (!filter.filterType) return acc;

    const getValue = () => {
      switch (filter.filterType) {
        case CostChargeAnalysisFilterType.City:
          return filter.value?.value;
        case CostChargeAnalysisFilterType.County:
          return filter.value?.value;
        case CostChargeAnalysisFilterType.Toponymy:
          return filter.value?.toponymy;
        case CostChargeAnalysisFilterType.UtilityServices:
          return filter.value.map(({ utilityContractCode }) => utilityContractCode);
        case CostChargeAnalysisFilterType.Estates:
        case CostChargeAnalysisFilterType.UtilityTypes:
          return filter.value.map(({ id }) => id);
      }
    };
    const value = getValue();
    if (!value) return acc;

    return {
      ...acc,
      [filter.filterType]: value,
    };
  }, {});

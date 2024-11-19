import {
  CostChargeAnalysisFilterFormInput,
  CostChargeAnalysisFormInput,
} from '../../interfaces/FormInputs/CostChargeAnalysis';

export const getEmptyCostChargeAnalysisFilterFormInput = (): CostChargeAnalysisFilterFormInput => ({
  filterType: null,
  value: null,
});

export const getEmptyCostChargeAnalysisFormInput = (): CostChargeAnalysisFormInput => ({
  filters: [],
});

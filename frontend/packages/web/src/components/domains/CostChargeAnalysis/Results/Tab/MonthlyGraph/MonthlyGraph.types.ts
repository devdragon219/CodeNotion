import { CostChargeAnalysisFragment } from '../../../../../../gql/RealGimm.Web.CostChargeAnalysis.fragment';

export interface CostChargeAnalysisResultMonthlyGraphProps {
  result: CostChargeAnalysisFragment;
  type: 'consumption' | 'cost';
}

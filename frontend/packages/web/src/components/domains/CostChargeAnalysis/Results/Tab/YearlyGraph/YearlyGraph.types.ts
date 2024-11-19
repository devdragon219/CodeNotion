import { CostChargeAnalysisFragment } from '../../../../../../gql/RealGimm.Web.CostChargeAnalysis.fragment';

export interface CostChargeAnalysisResultYearlyGraphProps {
  result: CostChargeAnalysisFragment;
  type: 'consumption' | 'cost';
}

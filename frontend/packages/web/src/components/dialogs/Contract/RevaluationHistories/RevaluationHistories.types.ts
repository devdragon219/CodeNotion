import { RevaluationHistoryFragment } from '../../../../gql/RealGimm.Web.RevaluationHistory.fragment';

export interface ContractRevaluationHistoriesDialogProps {
  revaluationHistories: RevaluationHistoryFragment[];
  onClose: () => void;
}

import { BillingPauseFragment } from '../../../../gql/RealGimm.Web.BillingPause.fragment';

export interface ContractBillingPausesDialogProps {
  billingPauses: BillingPauseFragment[];
  onClose: () => void;
}

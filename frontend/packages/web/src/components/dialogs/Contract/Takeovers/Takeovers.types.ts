import { TakeoverFragment } from '../../../../gql/RealGimm.Web.Takeover.fragment';

export interface ContractTakeoversDialogProps {
  takeovers: TakeoverFragment[];
  onClose: () => void;
}

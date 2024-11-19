import { ContractFragment } from '../../../../gql/RealGimm.Web.ContractListOutput.fragment';

export interface ContractLocatedUnitsDialogProps {
  contract: ContractFragment;
  onClose: () => void;
}

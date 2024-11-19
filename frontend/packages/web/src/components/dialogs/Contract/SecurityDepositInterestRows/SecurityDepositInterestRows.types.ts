import { SecurityDepositInterestRowFragment } from '../../../../gql/RealGimm.Web.SecurityDepositInterestRow.fragment';

export interface ContractSecurityDepositInterestRowsDialogProps {
  interestRows: SecurityDepositInterestRowFragment[];
  onClose: () => void;
}

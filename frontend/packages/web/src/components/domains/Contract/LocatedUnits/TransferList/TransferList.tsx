import { ContractEstateSubUnits } from './EstateSubUnits/EstateSubUnits';
import { ContractEstateUnits } from './EstateUnits/EstateUnits';
import { ContractLocatedUnitsTransferListProps } from './TransferList.types';

export const ContractLocatedUnitsTransferList = ({
  isContractActive,
  excludeIds,
  ...props
}: ContractLocatedUnitsTransferListProps) =>
  isContractActive ? (
    <ContractEstateSubUnits {...props} excludeEstateSubUnitIds={excludeIds} />
  ) : (
    <ContractEstateUnits {...props} excludeEstateUnitIds={excludeIds} />
  );

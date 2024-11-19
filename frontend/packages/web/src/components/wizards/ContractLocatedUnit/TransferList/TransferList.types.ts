import { ContractLocatedUnitFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractLocatedUnitsTransferListStepProps {
  currentLocatedUnits: ContractLocatedUnitFormInput[];
  isContractActive: boolean;
  locatedUnits: ContractLocatedUnitFormInput[];
  onChange: (locatedUnits: ContractLocatedUnitFormInput[]) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}

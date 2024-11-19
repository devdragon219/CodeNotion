import { ContractLocatedUnitFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractLocatedUnitsTableStepProps {
  locatedUnits: ContractLocatedUnitFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (locatedUnits: ContractLocatedUnitFormInput[]) => void;
  onError: () => void;
  onSave: (locatedUnits: ContractLocatedUnitFormInput[]) => void;
}

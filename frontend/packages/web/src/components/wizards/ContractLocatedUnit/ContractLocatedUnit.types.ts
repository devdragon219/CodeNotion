import { ContractLocatedUnitFormInput } from '../../../interfaces/FormInputs/Contract';

export interface ContractLocatedUnitCreateDialogProps {
  currentLocatedUnits: ContractLocatedUnitFormInput[];
  isActive: boolean;
  onClose: () => void;
  onSave: (locatedUnits: ContractLocatedUnitFormInput[]) => void;
}

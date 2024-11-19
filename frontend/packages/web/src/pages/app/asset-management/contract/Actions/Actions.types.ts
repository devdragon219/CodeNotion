import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ActionsProps {
  contract: ContractFormInput;
  isContractActive: boolean;
  onSuccess: () => void;
}

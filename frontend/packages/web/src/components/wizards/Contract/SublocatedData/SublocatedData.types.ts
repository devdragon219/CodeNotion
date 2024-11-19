import { ContractFragment } from '../../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractSublocatedDataStepProps {
  contract: ContractFormInput;
  hasSublocatedContract: boolean;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onShowAllLocatedUnits: (contract: ContractFragment) => void;
}

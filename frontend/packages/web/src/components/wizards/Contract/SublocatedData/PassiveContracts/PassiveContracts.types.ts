import { ContractFragment } from '../../../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractSublocatedDataPassiveContractsSubStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onShowAllLocatedUnits: (contract: ContractFragment) => void;
}

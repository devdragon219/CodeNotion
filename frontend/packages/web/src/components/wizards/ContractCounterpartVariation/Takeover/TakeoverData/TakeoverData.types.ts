import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface TakeoverDataStepProps {
  counterpartTakeover: ContractCounterpartVariationTakeoverFormInput;
  isContractActive: boolean;
  managementSubjectOfficers: {
    id: number;
    name: string;
  }[];
  onBack: () => void;
  onChange: (counterpartTakeover: ContractCounterpartVariationTakeoverFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

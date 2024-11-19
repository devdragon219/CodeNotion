import { FacilityContractTypeFormInput } from '../../../interfaces/FormInputs/FacilityContractType';

export interface FacilityContractTypeDialogProps {
  input?: FacilityContractTypeFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: FacilityContractTypeFormInput) => void;
}

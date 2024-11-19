import { FacilityContractTermExtensionFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface TermExtensionDialogInput {
  termExtension: FacilityContractTermExtensionFormInput;
  index: number;
}

export interface TermExtensionDialogProps {
  input?: TermExtensionDialogInput;
  onClose: () => void;
  onSave: (value: FacilityContractTermExtensionFormInput | TermExtensionDialogInput) => void;
}
